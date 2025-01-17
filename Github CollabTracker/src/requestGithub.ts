import { invoke } from "@tauri-apps/api/core";
import { Constructor } from "./util/constructor";
import { JSONDate } from "./FileIO/JSONDate";

export abstract class RequestGithub {

  public static async sendPostRequest<T extends object>(url: string, queryParameters: Map<string, string>, con: Constructor<T>): Promise<T> {
    return Object.assign(new con(), JSON.parse(await invoke('post_request_github', { url: url, queryParams: queryParameters })));
  }

  public static async sendGetRequest(url: string, queryParameters: Map<string, string>, tok: string): Promise<Object> {
    return await JSON.parse(await invoke('get_request_github', { url: url, queryParams: queryParameters, token: tok }), JSONDate.reviveDateTime);
  }
}