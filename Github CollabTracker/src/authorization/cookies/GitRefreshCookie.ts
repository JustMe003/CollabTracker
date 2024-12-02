import { AuthenticationData } from "../authenticationData";
import { CookieHandler } from "./cookies";

export class GitRefreshCookie extends CookieHandler {
  private static cookieName = "RefreshGitToken";
  
  public static setRefreshCookie(authenticationData: AuthenticationData) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authenticationData.getRefreshTokenExpiresIn());
    this.setCookies(this.cookieName, btoa(authenticationData.getRefreshToken()), { expires: date });
  }

  public static getRefreshCookie(): string {
    return atob(this.getCookies<string>(this.cookieName));
  }
}