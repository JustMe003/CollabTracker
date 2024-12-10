import { UserApiModel } from "../ApiModels/UserApiModel";
import { GitTokenCookie } from "../authorization/cookies/GitTokenCookie";
import { RequestGithub } from "../requestGithub";

export abstract class Scraper{
  public static async scrapeUser() : Promise<UserApiModel>{
    const userData =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      GitTokenCookie.getGitTokenCookie() as string) as UserApiModel
    return userData;
  }
  
}