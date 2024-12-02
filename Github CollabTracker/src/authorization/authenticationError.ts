export class AuthenticationError {
  private error: string;
  private errorDescription: string;
  private errorUri: string;

  constructor(error: string, errorDescription: string, errorUri: string) {
    this.error = error;
    this.errorDescription = errorDescription;
    this.errorUri = errorUri;
  }

  public getError() {
    return this.error;
  }

  public getErrorDescription() {
    return this.errorDescription;
  }
}