const { Schema, model } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const commentSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: false, default: `${this.name} ${this.lastName}` },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const Comment = model("Comment", commentSchema);

Comment.plugin(timestamp);

module.exports = Comment;
