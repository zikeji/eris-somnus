import globby from "globby";
import { resolve } from "path";
import type { SomnusBaseModule } from "../modules/SomnusBaseModule";
import type { SomnusClient } from "../SomnusClient";
import { SomnusClientEvents } from "../SomnusClientEvents";
import { SomnusRegistryError } from "../util/SomnusRegistryError";

/**
 * Base SomnusRegistry class handling logic for loading and reloading it's own modules.
 * @typeParam T The module the registry holds.
 */
export class SomnusRegistry<T extends SomnusBaseModule> extends Map<string, T> {
  /**
   * Creates a registry with for the provided module and directory.
   * @param client Client instance.
   * @param name The name of the registry, which corresponds to the base and user directory.
   * @param moduleConstructor The constructor for the registry's modules.
   */
  constructor(
    public client: SomnusClient,
    public name: string,
    public readonly moduleConstructor: unknown
  ) {
    super();
  }

  /**
   * Load all modules in the registry.
   */
  async load(): Promise<void> {
    super.clear();
    const promises: Promise<T | null>[] = [];
    const modules = await globby(
      [
        resolve(__dirname, "../../", this.name, "**/*.js").replace(/\\/g, "/"),
        resolve(this.name, "**/*.js").replace(/\\/g, "/"),
      ],
      {
        absolute: true,
      }
    );
    modules.forEach((module) =>
      promises.push(this.loadModule(resolve(module)))
    );
    await Promise.all(promises);
    this.client.emit(
      SomnusClientEvents.info,
      this.name,
      `Loaded ${promises.length} modules.`
    );
  }

  /**
   * Reload all modules in the registry.
   */
  async reload(): Promise<void> {
    return this.load();
  }

  /**
   * Load a module by it's path into the registry.
   */
  async loadModule(modulePath: string): Promise<T | null> {
    this.client.emit(
      SomnusClientEvents.info,
      this.name,
      `Loading module at "${modulePath}".`
    );
    let module: T | null = null;
    try {
      const LoadedModule = (await import(modulePath)) as
        | {
            default: new (
              somnia: SomnusClient,
              registry: SomnusRegistry<T>
            ) => T;
          }
        | (new (somnia: SomnusClient, registry: SomnusRegistry<T>) => T);
      // covers edgecase of moduleinterop for ts compiling
      // istanbul ignore next
      const ModuleConstructor =
        "default" in LoadedModule ? LoadedModule.default : LoadedModule;
      module = new ModuleConstructor(this.client, this) as T;
      this.add(module);
    } catch (error) {
      this.client.emit(
        SomnusClientEvents.error,
        new SomnusRegistryError(`Failed to load module ${modulePath}.`),
        error
      );
    }
    delete require.cache[modulePath];
    return module;
  }

  /**
   * Add a module to the registry.
   */
  public add(module: T): T | null {
    if (!(module instanceof (this.moduleConstructor as never))) {
      this.client.emit(
        SomnusClientEvents.error,
        new SomnusRegistryError(`Invalid module was attempted to be added.`)
      );
      return null;
    }
    this.delete(module);
    this.client.emit(SomnusClientEvents.ModuleLoaded, module);
    super.set(module.name, module);
    return module;
  }

  /**
   * Delete a module from the registry.
   */
  public delete(name: T | string): boolean {
    const module = super.get(typeof name === "string" ? name : name.name);
    if (!module) return false;
    super.delete(module.name);
    return true;
  }

  /**
   * The overriden set method, this will always throw.
   * @internal
   */
  // eslint-disable-next-line class-methods-use-this
  public set(): never {
    throw new Error("Cannot set in this Registry.");
  }

  /**
   * Return the name of this registry.
   */
  public toString(): string {
    return this.name;
  }
}
