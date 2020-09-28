import SomnusMonitor from "../modules/SomnusMonitor";
import type { SomnusClient } from "../SomnusClient";
import { SomnusRegistry } from "./SomnusRegistry";

export class SomnusMonitorRegistry extends SomnusRegistry<SomnusMonitor> {
  constructor(somnus: SomnusClient) {
    super(somnus, "monitors", SomnusMonitor);
  }
}
