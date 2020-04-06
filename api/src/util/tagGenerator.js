// Get tag model/table
const Tag = require("../database/model/_Tag");

// Here we create a function that will randomly generate a four digit number and make sure that it does not exist in the database. If there is one it will call itself again to renew the process.

function createTag() {
  return Math.floor(1000 + Math.random() * 5000);
}

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
