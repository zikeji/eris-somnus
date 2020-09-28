import { Message } from "eris";
import { SomnusClient } from "../src";
import MessageCreate from "../src/events/MessageCreate";

describe("MessageCreate event", function () {
  let module: MessageCreate;
  it("should construct", function () {
    module = new MessageCreate(({ on: () => null } as unknown) as SomnusClient);
  });
  it("should do something?", async function () {
    module.run({ content: "test" } as Message);
  });
});
