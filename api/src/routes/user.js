// Get the router from express
const router = require("express").Router();
// Importing the User model/table so that we can make use of it
const User = require("../database/model/_User");
// Last but not least getting the verification function so that we can verify the jwt
const verify = require("./verifyToken");

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

module.exports = router;
