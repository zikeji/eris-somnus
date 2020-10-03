import { SomnusRegistry } from "../registries/SomnusRegistry";
import { SomnusClientEvents } from "../SomnusClientEvents";
import type { SomnusClient } from "../SomnusClient";

/**
 * Base module options to be extended by classes extended SomnusBaseModule.
 */
export interface SomnusBaseModuleOptions {
  /**
   * Whether or not this module is enabled.
   */
  enabled?: boolean;

  /**
   * Module name. Should be unique in it's registry.
   */
  readonly name: string;
}

export interface SomnusBaseModule {
  /**
   * Optional initializer function.
   */
  init?(): unknown;
}

/**
 * Base module that all other modules extend.
 */
export class SomnusBaseModule implements SomnusBaseModuleOptions {
  /** @inheritdoc */
  public enabled: boolean;
  /** @inheritdoc */
  public readonly name: string;

  /**
   * Creates a base module instance. In practice our loaded modules in their respective directories only accept somnus in the constructor and define their own options (and other properties)
   * @param somnus Client instance.
   * @param options Module options.
   */
  constructor(
    /**
     * Client instance.
     */
    public client: SomnusClient,
    /**
     * The registry this module is from.
     */
    public registry: SomnusRegistry<SomnusBaseModule>,
    options?: SomnusBaseModuleOptions
  ) {
    this.enabled =
      typeof options?.enabled === "boolean" ? options.enabled : false;
    if (options && options.name) {
      this.name = options.name;
    } else {
      throw TypeError("Module name must be provided.");
    }
  }

  public get type(): string {
    return this.registry.name;
  }

  /**
   * Enables this module.
   */
  public enable(): this {
    this.enabled = true;
    this.client.emit(SomnusClientEvents.ModuleEnabled, this);
    return this;
  }

  /**
   * Disables this module.
   */
  public disable(): this {
    this.enabled = false;
    this.client.emit(SomnusClientEvents.ModuleDisabled, this);
    return this;
  }

  /**
   * Returns the module name.
   */
  public toString(): string {
    return this.name;
  }
}
