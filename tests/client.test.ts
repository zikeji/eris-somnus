import { expect } from "chai";
import { SomnusEventRegistry } from "../src/lib/registries/SomnusEventRegistry";
import { SomnusMonitorRegistry } from "../src/lib/registries/SomnusMonitorRegistry";
import { Eris, SomnusClient } from "../src/lib/SomnusClient";

describe("SomnusClient Eris extension", () => {
  it("expect Eris.Client to be SomnusClient", () => {
    expect(Eris.Client).to.equal(SomnusClient);
  });
});

const client = new SomnusClient(process.env.BOT_TOKEN || "", {});

describe("SomnusClient Registries", () => {
  it("expect events to be instance of SomnusEventRegistry", () => {
    expect(client.events).to.instanceOf(SomnusEventRegistry);
  });
  it("expect monitors to be instance of SomnusEventRegistry", () => {
    expect(client.monitors).to.instanceOf(SomnusMonitorRegistry);
  });
});

/**
 * Some basic tests to ensure the SomnusClient properly runs it's own connect routine and doesn't interfere with Eris.
 */
describe("SomnusClient Connect", () => {
  before(async () => {
    return client.connect();
  });
  it("expect ready event", (done) => {
    client.on("ready", () => {
      done();
    });
  });
  it("expect disconnect event", (done) => {
    client.on("disconnect", () => {
      done();
    });
    client.disconnect({ reconnect: false });
  });
});
