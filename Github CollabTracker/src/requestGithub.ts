import { invoke } from "@tauri-apps/api/core";

export abstract class RequestGithub {
  public static async sendPostRequest<T>(url: string, queryParameters: Map<string, string>): Promise<T> {
    return JSON.parse(await invoke('post_request_github', { url: url, queryParams: queryParameters })) as T;
  }
}