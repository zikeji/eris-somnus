/**
 * Error emitted when a registry runs into a problem.
 */
export class SomnusRegistryError extends Error {
  constructor(message?: string) {
    const proto = new.target.prototype;
    super(message);
    Object.setPrototypeOf(this, proto);
  }
}
