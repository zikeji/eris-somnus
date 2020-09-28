import { SomnusEvent } from "../modules/SomnusEvent";
import type { SomnusClient } from "../SomnusClient";
import { SomnusBaseModuleConstructor, SomnusRegistry } from "./SomnusRegistry";

export class SomnusEventRegistry extends SomnusRegistry<SomnusEvent> {
  constructor(somnus: SomnusClient) {
    super(
      somnus,
      "events",
      (SomnusEvent as unknown) as SomnusBaseModuleConstructor<SomnusEvent>
    );
  }
}
