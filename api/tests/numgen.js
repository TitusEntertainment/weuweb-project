const genTag = require("../src/util/tagGenerator");

(async () => {
  console.log("waiting for genTag()");
  const data = await genTag();
  console.log(data);
})();
