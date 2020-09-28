import { SomnusEvent } from "../modules/SomnusEvent";
import type { SomnusClient } from "../SomnusClient";
import { SomnusRegistry } from "./SomnusRegistry";

export class SomnusEventRegistry extends SomnusRegistry<SomnusEvent> {
  constructor(somnus: SomnusClient) {
    super(somnus, "events", SomnusEvent);
  }
}
