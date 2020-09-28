import { expect } from "chai";
import { SomnusEventRegistry } from "../src/lib/registries/SomnusEventRegistry";
import { SomnusMonitorRegistry } from "../src/lib/registries/SomnusMonitorRegistry";
import { Eris, SomnusClient } from "../src/lib/SomnusClient";

describe("SomnusClient Eris extension", function () {
  it("expect Eris.Client to be SomnusClient", function () {
    expect(Eris.Client).to.equal(SomnusClient);
  });
});

const client = new SomnusClient(process.env.BOT_TOKEN || "", {});

describe("SomnusClient Registries", function () {
  it("expect events to be instance of SomnusEventRegistry", function () {
    expect(client.events).to.instanceOf(SomnusEventRegistry);
  });
  it("expect monitors to be instance of SomnusEventRegistry", function () {
    expect(client.monitors).to.instanceOf(SomnusMonitorRegistry);
  });
});

/**
 * Some basic tests to ensure the SomnusClient properly runs it's own connect routine and doesn't interfere with Eris.
 */
describe("SomnusClient Connect", function () {
  this.timeout(30000);
  this.slow(2000);
  before(async function () {
    return client.connect();
  });
  it("expect ready event", function (done) {
    client.on("ready", function () {
      done();
    });
  });
});

describe("SomnusClient Disconnect", function () {
  it("expect disconnect event", function (done) {
    client.on("disconnect", function () {
      done();
    });
    client.disconnect({ reconnect: false });
  });
});
