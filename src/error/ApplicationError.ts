export class ApplicationError extends Error {
  public name: string;
  public code: string;

  /**
   * @param message
   * @param code
   */
  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
