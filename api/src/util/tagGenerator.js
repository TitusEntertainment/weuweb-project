const Tag = require("../database/model/_Tag");

function createTag() {
  return Math.floor(1000 + Math.random() * 5000);
}

// The genTag function is an asyncronus function that creates a tag and tries to find a duplicate in the databse. If there is one we make a loop and try creating new tags untill we find one that isn't in the database and then return that. We expect a username so that we only have to query for people with similar usernames so that we can optimise it. Yes, it is okay for two users to have the same discriminators but NOT name and discriminator
const genTag = async (username) => {
  let newTag = createTag();

  //let data = await Tag.findOne({ tag: newTag });
  let data = await Tag.find({ username }).select("tag -_id");
  if (data.length > 10000) return null;

  const tags = data.map((el) => el.tag);
  while (tags.includes(newTag)) {
    newTag = createTag();
    if (!tags.includes(newTag)) break;
  }

  return newTag;
};

module.exports = genTag;
