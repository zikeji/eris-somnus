import { Message } from "eris";
import { SomnusEvent } from "../index";
import type { SomnusClient } from "../lib/SomnusClient";
import type { SomnusEventRegistry } from "../lib/registries/SomnusEventRegistry";
import { SomnusClientEvents } from "../lib/SomnusClientEvents";

export default class extends SomnusEvent {
  constructor(client: SomnusClient, registry: SomnusEventRegistry) {
    super(client, registry, {
      enabled: true,
      name: "MonitorHandler",
      event: "messageCreate",
    });
  }

  async run(message: Message): Promise<void> {
    this.client.emit(SomnusClientEvents.info, message, this.name);
  }
}
