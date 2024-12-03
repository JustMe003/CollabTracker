export class AuthenticationData {
  
  private access_token: string;
  private expires_in: number;
  private refresh_token: string;
  private refresh_token_expires_in: number;
  private scope: string;
  private token_type: string;

  constructor(accessToken: string, expiresIn: number, refreshToken: string, refreshTokenExpiresIn: number, scope: string, tokenType: string) {
    this.access_token = accessToken;
    this.expires_in = expiresIn;
    this.refresh_token = refreshToken;
    this.refresh_token_expires_in = refreshTokenExpiresIn;
    this.scope = scope;
    this.token_type = tokenType;
  }

  public getAccessToken() {
    return this.access_token;
  }

  public getExpiresIn() {
    return this.expires_in;
  }

  public getRefreshToken() {
    return this.refresh_token;
  }

  public getRefreshTokenExpiresIn() {
    return this.refresh_token_expires_in;
  }
}