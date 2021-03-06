const jwt = require("jsonwebtoken");
const { Logger } = require("@ayana/logger");
const logger = Logger.get("Verify Token");

//This function simply looks at the header of a post request and checks if it has the jwt token. If it does it tries to verify it. If it's invalid we return a 400 (invalid token) and if there is no token we return a 401 access denied otherwise we decode it and attach it to req.user so that the Id that's decoded get's passed. This way we can get the user in our other requests.

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
    logger.error(e);
  }
  return undefined;
};
