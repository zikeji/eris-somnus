/**
 * Error emitted when the client runs into a problem.
 */
export class SomnusClientError extends Error {
  constructor(message?: string) {
    const proto = new.target.prototype;
    super(message);
    Object.setPrototypeOf(this, proto);
  }
}
