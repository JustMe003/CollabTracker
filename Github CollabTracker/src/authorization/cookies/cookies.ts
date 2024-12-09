import Cookies, { CookieSetOptions } from "universal-cookie";

export abstract class CookieHandler {
  private static cookie: Cookies = new Cookies();

  protected static setCookies(name: string, value: string, options: CookieSetOptions) {
    this.cookie.set(name, value, options)
  }

  protected static getCookies<T>(name: string): T {
    return this.cookie.get(name) as T;
  }

  protected static removeCookies(name:string){
    this.cookie.remove(name);
  }
}