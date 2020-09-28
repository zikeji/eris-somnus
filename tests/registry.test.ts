import { use, expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { readFile, writeFile } from "fs";
import { promisify } from "util";
import { SomnusBaseModule } from "../src/lib/modules/SomnusBaseModule";
import {
  SomnusBaseModuleConstructor,
  SomnusRegistry,
} from "../src/lib/registries/SomnusRegistry";
import { SomnusClient } from "../src/lib/SomnusClient";

use(chaiAsPromised);

export abstract class SomnusBaseModuleTest extends SomnusBaseModule {
  abstract outputSuccess: () => string;
}

/**
 * for the module reject
 */
export default class {}

let registry: SomnusRegistry<SomnusBaseModuleTest>;

describe("Create and load basic registry", function () {
  registry = new SomnusRegistry<SomnusBaseModuleTest>(
    {} as SomnusClient,
    "testRegistryModule",
    (SomnusBaseModuleTest as unknown) as SomnusBaseModuleConstructor<
      SomnusBaseModuleTest
    >
  );
  before(async function () {
    process.chdir(__dirname);
    const moduleText = await promisify(readFile)(
      "./testRegistryModule/module.js",
      "utf-8"
    );
    await promisify(writeFile)(
      "./testRegistryModule/module.js",
      moduleText.replace(/return "successModified";/, 'return "success";'),
      "utf8"
    );
    await registry.load();
  });
  let testModule: SomnusBaseModuleTest;
  it("should have test module", function () {
    expect(registry.modules.has("test")).to.equal(true);
    testModule = registry.modules.get("test") as SomnusBaseModuleTest;
  });
  it("should output success", function () {
    expect(testModule.outputSuccess()).to.equal("success");
  });
});

describe("Update module and successfully reload new change in registry", function () {
  before(async function () {
    const moduleText = await promisify(readFile)(
      "./testRegistryModule/module.js",
      "utf-8"
    );
    await promisify(writeFile)(
      "./testRegistryModule/module.js",
      moduleText.replace(/return "success";/, 'return "successModified";'),
      "utf8"
    );
    await registry.reload();
  });
  let testModule: SomnusBaseModuleTest;
  it("should have test module", function () {
    expect(registry.modules.has("test")).to.equal(true);
    testModule = registry.modules.get("test") as SomnusBaseModuleTest;
  });
  it("should output successModified", function () {
    expect(testModule.outputSuccess()).to.equal("successModified");
  });
});

describe("Add invalid module to registry", function () {
  it('should fail with "Invalid Module"', async function () {
    await expect(registry.loadModule(__filename)).to.be.rejectedWith(
      "Invalid Module"
    );
  });
});

describe("Delete module in registry", function () {
  it("should delete module", function () {
    expect(registry.remove("test")).to.equal(true);
  });
});
