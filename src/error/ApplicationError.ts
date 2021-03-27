export class ApplicationError extends Error {
  public name: string;
  public code: string|number;

  /**
   * @param message
   * @param code
   */
  constructor(message: string, code: string|number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}
