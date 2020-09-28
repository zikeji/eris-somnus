import globby from "globby";
import { resolve } from "path";
import { Debug } from "../Debug";
import type { SomnusBaseModule } from "../modules/SomnusBaseModule";
import type { SomnusClient } from "../SomnusClient";

const debug = Debug("lib:registries");

export type SomnusBaseModuleConstructor<T> = new (
  ...args: ConstructorParameters<typeof SomnusBaseModule>
) => T;

export class SomnusRegistry<T extends SomnusBaseModule> {
  public somnus: SomnusClient;
  public name: string;
  public modules: Map<string, T> = new Map();
  public readonly ModuleConstructor: SomnusBaseModuleConstructor<T>;

  constructor(
    somnus: SomnusClient,
    name: string,
    moduleConstructor: SomnusBaseModuleConstructor<T>
  ) {
    this.somnus = somnus;
    this.name = name;
    this.ModuleConstructor = moduleConstructor;
  }

  /**
   * Load all modules in the registry.
   */
  async load(): Promise<void> {
    this.modules.clear();
    const promises: Promise<void>[] = [];
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
    debug.extend(this.name)(`Loaded ${promises.length} modules.`);
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
  async loadModule(modulePath: string): Promise<void> {
    debug.extend(this.name)(`Loading module at "${modulePath}".`);
    const LoadedModule = (await import(modulePath)) as
      | {
          default: SomnusBaseModuleConstructor<T>;
        }
      | SomnusBaseModuleConstructor<T>;
    const ModuleConstructor =
      "default" in LoadedModule ? LoadedModule.default : LoadedModule;
    const module = new ModuleConstructor(this.somnus);
    this.add(module);
    delete require.cache[modulePath];
    debug.extend(this.name)(`Loaded module "${module.name}".`);
  }

  /**
   * Add a module to the registry.
   */
  public add(module: T): void {
    if (!(module instanceof this.ModuleConstructor)) {
      throw TypeError("Invalid Error");
    }
    this.remove(module);
    this.modules.set(module.name, module);
  }

  /**
   * Remove a module from the registry.
   */
  public remove(name: T | string): boolean {
    const module = this.modules.get(
      typeof name === "string" ? name : name.name
    );
    if (!module) return false;
    this.modules.delete(module.name);
    return true;
  }
}
