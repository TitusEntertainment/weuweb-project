const { Schema, model, Types } = require("mongoose");

const tagSchema = new Schema({
  tag: { type: Number, required: true },
  userId: { type: Types.ObjectId, required: true },
  username: { type: String, required: true },
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
