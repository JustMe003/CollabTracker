import { invoke } from "@tauri-apps/api/core";
import { Constructor } from "./util/constructor";

export abstract class RequestGithub {

  public static async sendPostRequest<T extends object>(url: string, queryParameters: Map<string, string>, con: Constructor<T>): Promise<T> {
    return Object.assign(new con(), JSON.parse(await invoke('post_request_github', { url: url, queryParams: queryParameters })));
  }

  public static async sendGetRequest<T extends object>(url: string, queryParameters: Map<string, string>, con: T): Promise<T> {
    return await JSON.parse(await invoke('get_request_github', { url: url, queryParams: queryParameters, token: "test" })) as typeof con;
  }
}