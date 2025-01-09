import * as apiMod from "../ApiModels";
import { RequestGithub } from "../requestGithub";

export class Scraper {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async scrapeUser() : Promise<apiMod.UserApiModel>{
    const userData =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      this.token) as apiMod.UserApiModel
    return userData;
  }

  public async scrapeRepos() : Promise<apiMod.RepoApiModel[]>{
    const repos =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user/repos",
      new Map<string, string>([
        ["affiliation", "owner,collaborator"]
      ]),
      this.token) as apiMod.RepoApiModel[]
    return repos;
  }


  public async scrapeIssues() : Promise<apiMod.IssueApiModel[]>{
    try {
      const issues =  await RequestGithub.sendGetRequest(
        "https://api.github.com/user/issues",
        new Map<string, string>([
          ["filter", "all"],
          ["state", "all"]
        ]),
        this.token) as apiMod.IssueApiModel[]
      return issues;
    } catch(e) {
      console.log(e);
    }
    return [];
  }

  public async scrapePullRequests(username: string) : Promise<apiMod.IssueApiModel[]>{
    const prs =  await RequestGithub.sendGetRequest(
      "https://api.github.com/search/issues",
      new Map<string, string>([
        ["involves", username],
        ["is", "pr" ]
      ]),
      this.token) as apiMod.IssueApiModel[]
    return prs;
  }


  public async scrapeBranches(repoID: string): Promise<apiMod.BranchApiModel[]> {
    const branches = await RequestGithub.sendGetRequest(
        `https://api.github.com/repositories/${repoID}/branches`,
        new Map<string, string>(),
        this.token
    ) as apiMod.BranchApiModel[];
    return branches;
  }



}