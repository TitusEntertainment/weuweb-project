const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const { Logger } = require("@ayana/logger");
const logger = Logger.get("app");
const database = require("./database/init.js");

// We begin by declaring the app
const app = express();

// Get protected envoirment variables. this is to ensure that credentials are kept safe. Create a .env file with a variable called DB_CONNECT and assign it to the correct MongoDB uri to connect to database
dotenv.config();

// Here we create the database and pass our URI
const db = new database(process.env.DB_CONNECT);

// Make sure that the api uses the json standard
app.use(express.json());

// Add route /user and tie the AUTH to that route.
app.use("/user", authRoute, userRoute);
app.use("/posts", postRoute);

// Here I define a simple listener that listens for the error event and loggs the errors. to the console Note: This might change to log files in the future
app.on("error", (err) => logger.error(err));

// This var checks if the env variable is set. If it isn't it will default to port 3000
const PORT = process.env.PORT || 3000;

// Start the app and connect to the databse

(async () => {
  await db.init();
})().then(app.listen(PORT, () => logger.info("ready")));
