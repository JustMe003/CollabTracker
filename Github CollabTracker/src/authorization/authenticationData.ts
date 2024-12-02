export class AuthenticationData {
  
  private accessToken: string;
  private expiresIn: number;
  private refreshToken: string;
  private refreshTokenExpiresIn: number;
  private scope: string;
  private tokenType: string;

  constructor(accessToken: string, expiresIn: number, refreshToken: string, refreshTokenExpiresIn: number, scope: string, tokenType: string) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    this.scope = scope;
    this.tokenType = tokenType;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getExpiresIn() {
    return this.expiresIn;
  }

  public getRefreshToken() {
    return this.refreshToken;
  }

  public getRefreshTokenExpiresIn() {
    return this.refreshTokenExpiresIn;
  }
}