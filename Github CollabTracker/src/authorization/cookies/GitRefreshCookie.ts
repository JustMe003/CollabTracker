import { AuthenticationData } from "../authenticationData";
import { CookieHandler } from "./cookies";

export class GitRefreshCookie extends CookieHandler {
  private static cookieName = "RefreshGitToken";
  
  public static setRefreshCookie(authenticationData: AuthenticationData) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authenticationData.getRefreshTokenExpiresIn());
    this.setCookies(this.cookieName, btoa(authenticationData.getRefreshToken()), { expires: date });
  }

  public static setRefreshCookieSessionOnly(authenticationData: AuthenticationData) {
    this.setCookiesSessionOnly(this.cookieName, btoa(authenticationData.getRefreshToken()));
  }

  public static getRefreshCookie(): string | null {
    const cookie = this.getCookies<string>(this.cookieName);
    if(cookie) return atob(cookie);
    return cookie;
  }

  public static removeRefreshCookie(){
    this.removeCookies(this.cookieName);
  }
}