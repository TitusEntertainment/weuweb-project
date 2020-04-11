// get the router instance from express and the verify function from verifyToken.js
const router = require("express").Router();
const verify = require("./verifyToken");

//Get the user post/comment model and the User
const Post = require("../database/model/_Post");
const User = require("../database/model/_User");

// Get logger
const { Logger } = require("@ayana/logger");
const logger = Logger.get("post");

//This simple get route returns all of the posts. We don't need to do any checking here because all we're doing is returning the posts. There's nothing to validate here.
router.get("/", async (req, res) => {
  const data = await Post.find({});

  if (!data) return res.status(204).send("No posts found");

  return res.status(200).send(data);
});

// This route creates a new post. If the user doesn't send a a text body object the api returns a 400. Otherwise it saves the data and then returns that data to the frontend so that the frontend doesn't have to get the data afterwards. This way we can save on the client sides (users) performance.

router.post("/new", verify, async (req, res) => {
  if (!req.body.body) return res.status(400).send("You must supply a text body!");
  const _user = await User.findOne({ _id: req.user._id });
  if (!_user) return res.status(500).send("Cannot find user even though the user has a valid jwt");

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

// This route is meant to delete the user. It's quite simple and only requires the jwt verification proccess to be valid. Once that's verified we try to delete the user.
router.post("/delete", verify, async (req, res) => {
  if (!req.body.postId || req.user._id !== req.body.userId || !req.body.userId)
    return res.status(400).send("You must supply a valid user and post id that are related.");

  try {
    await Post.deleteOne({ _id: req.body.postId });
    return res.status(200).send("Sucessfully deleted post");
  } catch (error) {
    res.status(500).send("Failed to delete post");
    logger.error(error);
  }
});

// This route simply edit's the user. It takes in an object with data and tries to apply that to the db
router.post("/edit", verify, async (req, res) => {
  if (!req.body) return res.status(400).send("You must provide a valid data object");

  if (!req.body.postId || req.user._id !== req.body.userId || !req.body.userId)
    return res.status(400).send("You must supply a valid user and post id that are related.");

  const data = Post.findOne({ _id: req.body.postId });

  if (!data) return res.status(500).send("No such post in database");

  const settings = req.body;

  if (typeof data !== "object") data = {};
  for (const key in settings) {
    if (data[key] !== settings[key]) data[key] = settings[key];
    else return;
  }
  await data.updateOne(data);
  return res.status(200).send("Succesfully updated user");
});
module.exports = router;
