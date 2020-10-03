import type { SomnusMonitorRegistry } from "../registries/SomnusMonitorRegistry";
import type { SomnusClient } from "../SomnusClient";
import { SomnusBaseModule, SomnusBaseModuleOptions } from "./SomnusBaseModule";

export interface SomnusMonitorOptions extends SomnusBaseModuleOptions {
  /**
   * the name of the event we're binding to.
   */
  event: string;
}

export default abstract class SomnusMonitor extends SomnusBaseModule {
  public event: string;
  constructor(
    client: SomnusClient,
    registry: SomnusMonitorRegistry,
    options: SomnusMonitorOptions
  ) {
    super(client, registry, options);
    this.event = options.event;
    this.client.on(this.event, this.run.bind(this));
  }

  public abstract run(...args: readonly unknown[]): Promise<void>;
}
