// get the router instance from express and the verify function from verifyToken.js
const router = require("express").Router();
const verify = require("./verifyToken");

//Get the user post/comment model and the User
const Post = require("../database/model/_Post");
const User = require("../database/model/_User");

// Get logger
const { Logger } = require("@ayana/logger");
const logger = Logger.get("post");

//Check if the user is verified
router.get("/", verify, (req, res) => {
  res.status(200).send("Hello, world!");
});


// This route creates a new post. If the user doesn't send a a text body object the api returns a 400. Otherwise it saves the data and then returns that data to the frontend so that the frontend doesn't have to get the data afterwards. This way we can save on the client sides (users) performance.

router.post("/new", verify, async (req, res) => {
  if (!req.body.body) return res.status(400).send("You must supply a text body!");
  const _user = await User.findOne({ _id: req.user._id });
  if (!_user) throw new Error("Cannot find user even though the user has a valid jwt");

  const newPost = new Post({
    userId: _user._id,
    username: _user.username,
    body: req.body.body,
  });

  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(500).send(`Something went wrong: ${error.message}`);
    logger.error(error);
  }
});

module.exports = router;
