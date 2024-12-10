import { UserApiModel } from "../ApiModels/UserApiModel";
import { RequestGithub } from "../requestGithub";

export class Scraper {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async scrapeUser() : Promise<UserApiModel>{
    const userData =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      this.token) as UserApiModel
    return userData;
  }
}