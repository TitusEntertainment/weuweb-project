const { Schema, model } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: false, default: `${this.name}#${this.tag}` },
  email: { type: String, required: true },
  tag: { type: Number, required: true },
  password: { type: String, required: true }
});

userSchema.plugin(timestamp);

const User = model("User", userSchema);

module.exports = User;
