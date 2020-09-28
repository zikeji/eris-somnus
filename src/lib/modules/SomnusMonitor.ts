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
  constructor(somnus: SomnusClient, options: SomnusMonitorOptions) {
    super(somnus, options);
    this.event = options.event;
    this.somnus.on(this.event, this.run.bind(this));
  }

  public abstract run(...args: readonly unknown[]): Promise<void>;
}
