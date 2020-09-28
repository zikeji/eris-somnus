import type { SomnusClient } from "../SomnusClient";

export interface SomnusBaseModuleOptions {
  name: string;
}

export class SomnusBaseModule {
  public name: string;
  public somnus: SomnusClient;

  constructor(somnus: SomnusClient, options?: SomnusBaseModuleOptions) {
    this.somnus = somnus;
    if (options && options.name) {
      this.name = options.name;
    } else {
      throw TypeError("Module name must be provided.");
    }
  }
}
