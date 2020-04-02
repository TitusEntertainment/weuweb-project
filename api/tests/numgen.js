const genTag = require("../src/util/tagGenerator");

(async () => {
  const data = await genTag();
  console.log(data);
})();
