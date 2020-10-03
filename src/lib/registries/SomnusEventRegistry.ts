import { SomnusEvent } from "../modules/SomnusEvent";
import type { SomnusClient } from "../SomnusClient";
import { SomnusRegistry } from "./SomnusRegistry";

/**
 * @inheritdoc
 */
export class SomnusEventRegistry extends SomnusRegistry<SomnusEvent> {
  /**
   * @inheritdoc
   * @param somnus Client instance.
   */
  constructor(somnus: SomnusClient) {
    super(somnus, "events", SomnusEvent);
  }
}
