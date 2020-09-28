import { Message } from "eris";
import { SomnusClient } from "../src";
import MonitorHandler from "../src/events/MonitorHandler";

describe("MessageCreate event", function () {
  let module: MonitorHandler;
  it("should construct", function () {
    module = new MonitorHandler(({
      on: () => null,
    } as unknown) as SomnusClient);
  });
  it("should do something?", async function () {
    module.run({ content: "test" } as Message);
  });
});
