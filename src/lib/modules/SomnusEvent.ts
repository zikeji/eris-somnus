import { SomnusBaseModule, SomnusBaseModuleOptions } from "./SomnusBaseModule";
import type { SomnusClient } from "../SomnusClient";

export interface SomnusEventOptions extends SomnusBaseModuleOptions {
  /**
   * The name of the event we're binding to.
   */
  event: string;
}

export abstract class SomnusEvent extends SomnusBaseModule {
  public event: string;
  constructor(somnus: SomnusClient, options: SomnusEventOptions) {
    super(somnus, options);
    this.event = options.event;
    this.somnus.on(this.event, this.run.bind(this));
  }

  public abstract run(...args: readonly unknown[]): Promise<void>;
}
