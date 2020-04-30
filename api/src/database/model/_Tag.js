const { Schema, model, Types } = require("mongoose");

// Define schema that has 4 variables: tag, userId, and username. We also assign
const tagSchema = new Schema({
  tag: { type: Number, required: true },
  userId: { type: Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true },
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
