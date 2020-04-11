// Get tag model/table
const Tag = require("../database/model/_Tag");

// Here we create a function that will randomly generate a four digit number and make sure that it does not exist in the database. If there is one it will call itself again to renew the process.

function createTag() {
  return Math.floor(1000 + Math.random() * 5000);
}

// The genTag function is an asycronys function that creates a tag and tries to find a duplicate in the databse. If there is one we make a loop and try creating new tags untill we find one that isn't in the database and then return that.
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
