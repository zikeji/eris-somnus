import { SomnusBaseModule, SomnusBaseModuleOptions } from "./SomnusBaseModule";
import type { SomnusClient } from "../SomnusClient";
import type { SomnusEventRegistry } from "../registries/SomnusEventRegistry";

/** @inheritdoc */
export interface SomnusEventOptions extends SomnusBaseModuleOptions {
  /**
   * The name of the [Eris client](https://abal.moe/Eris/docs/Client#event-callCreate) event we're listening to.
   */
  readonly event: string;

  /**
   * If this event should only fire once.
   */
  readonly once?: boolean;
}

/**
 * The class you extend when creating an event module. The registry handles passing the somnus client so you can assume that in the constructor, and then pass your options to super based on the event you'd like to create.
 * @inheritdoc
 * @example
 * Create a file in your `src/events` folder.
 * ```typescript
 * import { Guild, Member } from "eris";
 * import { SomnusEvent, SomnusEventRegistry } from "eris-somnus";
 *
 * export default class extends SomnusEvent {
 *   constructor(client: SomnusClient, registry: SomnusEventRegistry) {
 *     super(client, registry, {
 *       name: "MyGuildMemberAdd",
 *       event: "guildMemberAdd"
 *     });
 *   }
 *
 *   async run(guild: Guild, member: Member) {
 *     console.log("member joined", guild, member);
 *   }
 * }
 */
export abstract class SomnusEvent
  extends SomnusBaseModule
  implements SomnusEventOptions {
  /** @inheritdoc */
  public readonly event: string;

  /** @inheritdoc */
  public readonly once: boolean;

  /**
   * Create an event module instance.
   * @param somnus Client instance.
   * @param options Options being passed to the class instance.
   * ```
   */
  constructor(
    client: SomnusClient,
    registry: SomnusEventRegistry,
    options: SomnusEventOptions
  ) {
    super(client, registry, options);
    this.event = options.event;
    this.once = typeof options?.once === "boolean" ? options.once : false;
    this.client.on(this.event, this.run.bind(this));
  }

  /**
   * Function to implement with the arguments of the emitter.
   * @param args The arguments being passed by the event emitter.
   */
  public abstract run(...args: unknown[]): Promise<void>;
}
