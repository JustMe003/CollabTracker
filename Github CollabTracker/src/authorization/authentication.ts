import { RequestGithub } from "../requestGithub";
import { AuthenticationData } from "./authenticationData";
import { AuthenticationError } from "./authenticationError";
import { VerificationData } from "./verificationData";

export abstract class Authentication {
  
  static clientId = "Iv23liDO3ngcMFSVuXF7";
  static grantType = "urn:ietf:params:oauth:grant-type:device_code";
  

  public static async startAuthentication(): Promise<VerificationData> {
    return await RequestGithub.sendPostRequest<VerificationData>(
      "https://github.com/login/device/code", 
      new Map<string, string>([["client_id", Authentication.clientId]]));
  }

  public static async finishAuthentication(verificationData: VerificationData): Promise<AuthenticationData | AuthenticationError> {
    return await RequestGithub.sendPostRequest<AuthenticationData | AuthenticationError>(
      "https://github.com/login/oauth/access_token",
      new Map<string, string>([
        ["client_id", Authentication.clientId],
        ["device_code", verificationData.getDeviceCode()],
        ["grant_type", Authentication.grantType]
      ])
    );
  }
}