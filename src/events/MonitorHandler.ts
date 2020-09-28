import { Message } from "eris";
import { Debug } from "../lib/Debug";
import { SomnusEvent } from "../index";
import type { SomnusClient } from "../lib/SomnusClient";

const debug = Debug("events:message-create");

export default class extends SomnusEvent {
  constructor(somnus: SomnusClient) {
    super(somnus, {
      name: "MonitorHandler",
      event: "messageCreate",
    });
  }

  async run(message: Message): Promise<void> {
    debug("received message", this.event, message.content);
  }
}
