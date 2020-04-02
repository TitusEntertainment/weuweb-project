// Get the express instance
const express = require("express");

//Get dotenv to handle envoirment variables
const dotenv = require("dotenv");

// Get the auth.js
const authRoute = require("./routes/auth");

//Declare the app instance
const app = express();
const db = reuqire("./database/init.js");

// Get protected envoirment variables. this is to ensure that credentials are kept safe. Create a .env file with a variable called DB_CONNECT and assign it to the correct MongoDB uri to connect to database
dotenv.config();

// Create an instance of the database handler and connect to the database.
const db = new db(process.env.DB_CONNECT);
db.init();

// Make sure that the api uses the json standard
app.use(express.json());

// Add route /user and tie the AUTH to that route.
app.use("/api/user", authRoute);
