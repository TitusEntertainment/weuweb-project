const jwt = require("jsonwebtoken");

//This function simply looks at the header of a post request and checks if it has the jwt token. If it does it tries to verify it. If it's invalid we return a 400 (invalid token) and if there is no token we return a 401 access denied

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
  return undefined;
};
