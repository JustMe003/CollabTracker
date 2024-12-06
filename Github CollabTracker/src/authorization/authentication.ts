import { RequestGithub } from "../requestGithub";
import { AuthenticationData } from "./authenticationData";
import { AuthenticationError } from "./authenticationError";
import { VerificationData } from "./verificationData";

export abstract class Authentication {
  
  static clientId = "Iv23liDO3ngcMFSVuXF7";
  static grantType = "urn:ietf:params:oauth:grant-type:device_code";
  static grantTypeRefresh = "urn:ietf:params:oauth:grant-type:refresh_token";
  

  public static async startAuthentication(): Promise<VerificationData> {
    return await RequestGithub.sendPostRequest<VerificationData>(
      "https://github.com/login/device/code", 
      new Map<string, string>([["client_id", Authentication.clientId]]),
      VerificationData
    );
  }

  public static async finishAuthentication(verificationData: VerificationData): Promise<AuthenticationData> {
    const res = await RequestGithub.sendPostRequest<AuthenticationData>(
      "https://github.com/login/oauth/access_token",
      new Map<string, string>([
        ["client_id", Authentication.clientId],
        ["device_code", verificationData.getDeviceCode()],
        ["grant_type", Authentication.grantType]
      ]),
      AuthenticationData
    );
    if("error" in res && "error_description" in res && "error_uri" in res) {
      const e = new AuthenticationError(res.error as string, res.error_description as string, res.error_uri as string);
      if("interval" in res) {
        e.setInterval(res.interval as number);
      }
      throw e;
    }
    return res;
  }

  public static async requestRefreshToken(refreshToken:string): Promise<AuthenticationData> {
    const res = await RequestGithub.sendPostRequest<AuthenticationData>(
      "https://github.com/login/oauth/access_token",
      new Map<string, string>([
        ["refresh_token", refreshToken],
        ["grant_type", Authentication.grantTypeRefresh],
        ["client_id", Authentication.clientId]
      ]),
      AuthenticationData
    );
    if("error" in res && "error_description" in res && "error_uri" in res) {
      const e = new AuthenticationError(res.error as string, res.error_description as string, res.error_uri as string);
      if("interval" in res) {
        e.setInterval(res.interval as number);
      }
      throw e;
    }
    return res;
  }
}