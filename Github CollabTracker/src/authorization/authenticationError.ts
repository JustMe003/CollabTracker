export class AuthenticationError extends Error {
  private error_description: string;
  private error_uri: string;
  private interval: number | null = null;

  constructor(error: string, errorDescription: string, errorUri: string) {
    super(error);
    this.error_description = errorDescription;
    this.error_uri = errorUri;
  }

  public setInterval(n: number) {
    this.interval = n;
  }

  public getErrorDescription() {
    return this.error_description;
  }

  public getInterval(): number | null {
    return this.interval;
  }
}