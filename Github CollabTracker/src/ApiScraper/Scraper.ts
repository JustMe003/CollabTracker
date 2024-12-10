import { BranchApiModel } from "../ApiModels/BranchApiModel";
import { RepoApiModel } from "../ApiModels/RepoApiModel";
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

  public static async scrapeRepos() : Promise<RepoApiModel[]>{
    const repos =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user/repos",
      new Map<string, string>(),
      GitTokenCookie.getGitTokenCookie() as string) as RepoApiModel[]
    return repos;
  }

  public static async scrapeBranches(repoID: string) : Promise<BranchApiModel[]>{
    const branches =  await RequestGithub.sendGetRequest(
      "https://api.github.com/repositories/${repoID}/branches",
      new Map<string, string>(),
      GitTokenCookie.getGitTokenCookie() as string) as BranchApiModel[]
    return branches;
  }
}