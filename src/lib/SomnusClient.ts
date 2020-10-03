import { Client, ClientOptions } from "eris";
import { SomnusMonitorRegistry } from "./registries/SomnusMonitorRegistry";
import { SomnusEventRegistry } from "./registries/SomnusEventRegistry";
import { SomnusClientEvents } from "./SomnusClientEvents";

/**
 * Client options unique to SomnusClient.
 */
export interface SomnusClientOptions extends ClientOptions {
  /**
   * The base directory for your modules.
   * @defaultValue .
   */
  userBaseDirectory?: string;
}

/**
 * @inheritdoc
 */
export class SomnusClient extends Client {
  public events: SomnusEventRegistry;
  public monitors: SomnusMonitorRegistry;
  constructor(token: string, options: SomnusClientOptions) {
    super(token, options);
    this.events = new SomnusEventRegistry(this);
    this.monitors = new SomnusMonitorRegistry(this);
  }

  async connect(): Promise<void> {
    this.emit(SomnusClientEvents.info, "Initializing Somnus.");
    const promises = [];
    promises.push(this.events.load());
    promises.push(this.monitors.load());
    await Promise.all(promises);
    this.emit(SomnusClientEvents.info, "Initialized Somnus.");
    return super.connect();
  }
}
