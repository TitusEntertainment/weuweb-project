// This was just a simple test to make sure that my tagGenerator functioned as expected.

const genTag = require("../src/util/tagGenerator");

(async () => {
  console.log("waiting for genTag()");
  const data = await genTag("Emmie");
  console.log(data);
})();
