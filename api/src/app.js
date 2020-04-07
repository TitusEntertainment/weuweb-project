// Get the express instance
const express = require("express");

//Get dotenv to handle envoirment variables
const dotenv = require("dotenv");

// Get the auth.js and post.js
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

// Get a logger instance
const { Logger } = require("@ayana/logger");
const logger = Logger.get("app");

//Declare the app instance
const app = express();
const database = require("./database/init.js");

// Get protected envoirment variables. this is to ensure that credentials are kept safe. Create a .env file with a variable called DB_CONNECT and assign it to the correct MongoDB uri to connect to database
dotenv.config();

// Create an instance of the database handler
const db = new database(process.env.DB_CONNECT);

// Make sure that the api uses the json standard
app.use(express.json());

// Add route /user and tie the AUTH to that route.
app.use("/user", authRoute);
app.use("/posts", postRoute);

// Here I define a simple listener that listens for the error event and loggs the errors. to the console Note: This might change to log files in the future
app.on("error", (err) => logger.error(err));

// This var checks if the env variable is set. If it isn't it will default to port 3000

const PORT = process.env.PORT || 3000;

// Start the app and connect to the databse

(async () => {
  await db.init();
})().then(app.listen(PORT, () => logger.info("ready")));
