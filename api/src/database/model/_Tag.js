const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  tag: { type: Number, required: true }
});

const Tag = model("Tag", tagSchema);

module.exports = Tag;
