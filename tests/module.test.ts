import { expect } from "chai";
import { SomnusBaseModule } from "../src/lib/modules/SomnusBaseModule";
import { SomnusRegistry } from "../src/lib/registries/SomnusRegistry";
import { SomnusClient } from "../src/lib/SomnusClient";

describe("abstract base module", function () {
  it("should throw if missing name", function () {
    expect(function () {
      new SomnusBaseModule(
        {} as SomnusClient,
        {} as SomnusRegistry<SomnusBaseModule>
      );
    }).to.throw(TypeError, "Module name must be provided.");
  });
});
