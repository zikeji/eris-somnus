import Eris from "eris";
import { Debug } from "./Debug";
import { SomnusMonitorRegistry } from "./registries/SomnusMonitorRegistry";
import { SomnusEventRegistry } from "./registries/SomnusEventRegistry";

const debug = Debug("lib:somnus-client");

export class SomnusClient extends Eris.Client {
  public events: SomnusEventRegistry;
  public monitors: SomnusMonitorRegistry;
  constructor(token: string, options: Eris.ClientOptions) {
    super(token, options);
    this.events = new SomnusEventRegistry(this);
    this.monitors = new SomnusMonitorRegistry(this);
  }

  async connect(): Promise<void> {
    debug("Initialing Somnus.");
    this.emit("info", "Initializing Somnus.");
    const promises = [];
    promises.push(this.events.load());
    promises.push(this.monitors.load());
    await Promise.all(promises);
    debug("Initialized Somnus.");
    return super.connect();
  }
}

Eris.Client = SomnusClient;
export { Eris };
