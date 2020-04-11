// Get the router from express so that we can get acess to post and get requests and make routes/functions for them
const router = require("express").Router();

// Bcrypt is the library we use to salt/hash passwords
const bcrypt = require("bcryptjs");

// JWT (json web token) is a token assigned to a user that has an expiery time. We send this to the frontend so that the frontend then can send this token back to validate anything whenever the user does a task
const jwt = require("jsonwebtoken");

// Here we get the user model
const User = require("../database/model/_User");

// Here we get the Tag model

const Tag = require("../database/model/_Tag");

// Here we get the tag generator function
const genTag = require("../util/tagGenerator");

// We also get two functions from val.js so that we can validate some things
const { registerValidation, loginValidation } = require("../validation/val");

router.post("/register", async (req, res) => {
  // Creates the /register endpoint of the api. Here we check if there's an error, and if there is an error; we sand a error code 400 and some details back.

  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already in db and if it is return an error

  const emailExist = await User.findOne({
    email: req.body.email,
  });

  if (emailExist) return res.status(400).send("There is already a user with that email.");

  // Then we hash/salt the password with bcrypt (a node module)
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Then we proceed to add the correct data to the user model we also get the new tag
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

  //Then we try to save it and return a user id to the frontend so that the frontend then can save that and use it to retrive the user once again if nececary

  try {
    await user.save();
    await newTag.save();
    return res.send({ user: user.id });
  } catch (e) {
    res.status(400).send(e);
  }
  return undefined;
});

// Login route
router.post("/login", async (req, res) => {
  // Just like before check for errors and check if there's a user with that login. If there isn't return an error

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({
    email: req.body.email,
  });
  // Check if email exists
  if (!user) return res.status(400).send("Email or password is wrong");
  // Password CHECK
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or password is wrong");

  // Create and assign token
  const token = jwt.sign(
    {
      data: { _id: user._id },
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );
  return res.header("auth-token", token).send(token);
});

// and finally we export this module so that we can assign it to an endpoint/a rote in app.js
module.exports = router;
