const router = require("express").Router();
const User = require("../database/model/_User");
const verify = require("./verifyToken");
const { Logger } = require("@ayana/logger");
const logger = Logger.get("user");

// This POST route is user/edit. It takes in an object with data. Of course we verify the jwt first, then we check if there was a body sent with the Post and request and if there isn't we return a error code 400 and a descriptive message. After that we try to get the user from the database and exception handle it in case it doesn't return anything. After that, we check the data that's been passed and updates the user
router.post("/edit", verify, async (req, res) => {
  if (!req.body) return res.status(400).send("You must provide a valid data object");

  const data = User.findOne({ _id: req.user._id });
  if (!data) return res.status(500).send("No such user in database");

  const settings = req.body;

  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
    else return;
  }
  await data.updateOne(data);
  return res.status(200).send("Succesfully updated user");
});

// This is the POST route that allows a user to delete their own account. I've implemented this to follow guidelines and laws dictated by the EU specifically GDPR. It begins by verifying the jwt and then we simply try to delete it. If it works we return a 200 (ok) if not we return a error 500 because we couldn't delete the user.
router.post("/delete", verify, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    res.status(200).send("Sucessfully deleted user");
  } catch (error) {
    res.status(500).send(`Could not delete user. Error: ${error.message}`);
    logger.error(error);
  }
});

// This is the GET route that get's the logged in users information. This route is meant for the display of the users profile. We verify the users token and then try to find the user in the database. If we do we return some of the users data (we don't return sensetive data like the password). If we don't find the user we return an internal error 500 otherwise we return the data with a 200 (ok) status
router.get("/", verify, async (req, res) => {
  const data = await User.findOne({ _id: req.user._id });
  if (!data) return res.status(500).send("Can't find any user with that id");

  return res.status(200).send(data._id, data.name, data.lastName, data.username, data.email, data.tag);
});

module.exports = router;
