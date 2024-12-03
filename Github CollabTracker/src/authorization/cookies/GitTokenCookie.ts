import { AuthenticationData } from "../authenticationData";
import { CookieHandler } from "./cookies";

export class GitTokenCookie extends CookieHandler {
  private static cookieName = "GitToken";

  public static setGitTokenCookie(authenticationData: AuthenticationData) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + authenticationData.getExpiresIn());
    this.setCookies(this.cookieName, btoa(authenticationData.getAccessToken()), { expires: date });
  }

  public static getGitTokenCookie(): string | null {
    const cookie = this.getCookies<string>(this.cookieName);
    if(cookie) return atob(cookie);
    return cookie;
  }
}