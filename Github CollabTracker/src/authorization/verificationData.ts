export class VerificationData {
  private deviceCode: string;
  private userCode: string;
  private verificationUri: string;
  private expiresIn: number;
  private interval: number;

  constructor(deviceCode: string, userCode: string, verificationUri: string, expiresIn: number, interval: number) {
    this.deviceCode = deviceCode;
    this.userCode = userCode;
    this.verificationUri = verificationUri;
    this.expiresIn = expiresIn;
    this.interval = interval;
  }

  public getDeviceCode() {
    return this.deviceCode;
  }

  public getUserCode() {
    return this.userCode;
  }

  public getVerificationUri() {
    return this.verificationUri;
  }

  public getExpiresIn() {
    return this.expiresIn;
  }

  public getInterval() {
    return this.interval;
  }
}