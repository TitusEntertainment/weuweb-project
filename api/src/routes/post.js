// get the router instance from express and the verify function from verifyToken.js
const router = require("express").Router();
const verify = require("./verifyToken");

//Check if the user is verified
router.get("/", verify, (req, res) => {
  res.send(req.user, "hello there");
});

module.exports = router;
