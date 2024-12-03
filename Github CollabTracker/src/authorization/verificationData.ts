export class VerificationData {
  private device_code: string;
  private user_code: string;
  private verification_uri: string;
  private expires_in: number;
  private interval: number;

  constructor(deviceCode: string, userCode: string, verificationUri: string, expiresIn: number, interval: number) {
    this.device_code = deviceCode;
    this.user_code = userCode;
    this.verification_uri = verificationUri;
    this.expires_in = expiresIn;
    this.interval = interval;
  }

  public getDeviceCode(): string {
    return this.device_code;
  }

  public getUserCode(): string {
    return this.user_code;
  }

  public getVerificationUri(): string {
    return this.verification_uri;
  }

  public getExpiresIn(): number {
    return this.expires_in;
  }

  public getInterval(): number {
    return this.interval;
  }
}