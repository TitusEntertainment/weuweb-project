const { Schema, model, Types } = require("mongoose");
const timestamp = require("mongoose-timestamp");

// Here we define the schema/table for the post
// The schema has only 3 variables
// An _id that's added automatically by mongoose/mongodb and it's always unique
// a user id with the same type as _id (Types.ObjectId)
// that user's username (the person who does the post)
// and the acutall body (the text that the user puts in)
const postSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  username: { type: String, required: true },
  body: { type: String, required: true },
});

// Here we add the timestamp plugin to the schema
postSchema.plugin(timestamp);

// Them from the schema we create a model (this adds all the nececary methods like .findOne and so on, so that we can interrface with the database)
const Post = model("post", postSchema);

module.exports = Post;
