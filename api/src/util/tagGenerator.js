// Get tag model/table
const Tag = require("../database/model/_Tag");

// Here we create a function that will randomly generate a four digit number and make sure that it does not exist in the database. If there is one it will call itself again to renew the process.
const genTag = async () => {
  const newTag = Math.floor(1000 + Math.random() * 5000);

  const data = await Tag.findOne({ newTag });
  if (data) genTag();
  else return newTag;
};

module.exports = genTag;
