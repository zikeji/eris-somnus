import SomnusMonitor from "../modules/SomnusMonitor";
import type { SomnusClient } from "../SomnusClient";
import { SomnusBaseModuleConstructor, SomnusRegistry } from "./SomnusRegistry";

export class SomnusMonitorRegistry extends SomnusRegistry<SomnusMonitor> {
  constructor(somnus: SomnusClient) {
    super(
      somnus,
      "monitors",
      (SomnusMonitor as unknown) as SomnusBaseModuleConstructor<SomnusMonitor>
    );
  }
}
