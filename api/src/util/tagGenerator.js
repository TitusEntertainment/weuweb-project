const Tag = require("../database/model/_Tag");

function createTag() {
  return Math.floor(1000 + Math.random() * 5000);
}

// The genTag function is an asycronys function that creates a tag and tries to find a duplicate in the databse. If there is one we make a loop and try creating new tags untill we find one that isn't in the database and then return that. We also don't expect any variables to be passed because it doesn't require it. We have a TAG model that we save every time we create a user that gets a tag. This way we can save on system recourses. We then return newTag
const genTag = async () => {
  let newTag = createTag();
  let bool;

  let data = await Tag.findOne({ tag: newTag });

  if (data) bool = true;
  else return newTag;

  while (bool) {
    newTag = genTag();
    data = await Tag.findOne({ tag: newTag });
    if (newTag !== data.tag) break;
  }
  return newTag;
};

module.exports = genTag;
