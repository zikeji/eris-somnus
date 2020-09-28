const { SomnusBaseModuleTest } = require("../registry.test");

module.exports = class extends SomnusBaseModuleTest {
  constructor(somnus) {
    super(somnus, {
      name: "test",
    });
  }

  outputSuccess() {
    return "successModified";
  }
}
