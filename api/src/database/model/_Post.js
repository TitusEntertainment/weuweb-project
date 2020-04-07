const { Schema, model, Types } = require("mongoose");
const timestamp = require("mongoose-timestamp");

const postSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  username: { type: String, required: true },
  body: { type: String, required: true },
});

postSchema.plugin(timestamp);

const Post = model("post", postSchema);

module.exports = Post;
