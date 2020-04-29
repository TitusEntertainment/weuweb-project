const { Schema, model } = require("mongoose");
const timestamp = require("mongoose-timestamp");
// Define usershcmea that includes, name, lastname, username, tag and password. We also assign if they need to be required and unique
const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: false, default: this.name },
  email: { type: String, required: true, unique: true },
  tag: { type: Number, required: true },
  password: { type: String, required: true },
});

// Plugin timestamp simply adds createdAt and updates everytime that the db does a query on it so that we can see if the data has been changed
userSchema.plugin(timestamp);

const User = model("User", userSchema);

module.exports = User;
