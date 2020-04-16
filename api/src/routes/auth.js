const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/model/_User");
const Tag = require("../database/model/_Tag");
const genTag = require("../util/tagGenerator");
const { registerValidation, loginValidation } = require("../validation/val");

// This route handles the registration. We begin by verifying that all the nececary data (and data restrictions like min password length, min name length etc) is passed form the frontend client if there isn't one we return an error 400 and pass the error message/details. We also make sure to check if the email passed already exits. Again if does we return a 400 and an error message. Once we've checked all that we generate a salt and then has the password with that salt. Once we've done that we generate a tag for this user and then we save the user in the database. We also save a separate tag model. Then we return a 200 (ok) and some of the users information
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({
    email: req.body.email,
  });

  if (emailExist) return res.status(400).send("There is already a user with that email.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const tag = await genTag();

  const user = new User({
    name: req.body.name,
    lastName: req.body.lastName,
    username: `${req.body.username}#${tag}`,
    email: req.body.email,
    tag,
    password: hashPassword,
  });

  const newTag = new Tag({
    tag,
    userId: user.id,
    username: user.username,
  });

  try {
    await user.save();
    await newTag.save();
    return res.send(user._id, user.name, user.lastName, user.username, user.email, user.tag);
  } catch (e) {
    res.status(400).send(e);
  }
  return undefined;
});

// This route handles the login. It needs the frontend client to pass in an email and a password. To make sure than we don't do anything complicated we just begin by checking if there's a valid body (the request from the client) that includes email and password. Then we check if we can find the user in the database. However, the error we throw back if the user isn't identified/in the database is the exact same one that we send if the password isn't correct later. This is to prevent brute forcing/out smarting the system. If it works correctly we return a newly signed jwt (json web token) that includes the users id. This way whenever we verify the jwt later we can always access the user

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Email or password is wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  const token = jwt.sign(
    {
      data: { _id: user._id },
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  return res.status(200).header("auth-token", token).send(token);
});

module.exports = router;
