import { BranchApiModel } from "../ApiModels/BranchApiModel";
import { IssueApiModel } from "../ApiModels/IssueApiModel";
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

  public async scrapeRepos() : Promise<RepoApiModel[]>{
    const repos =  await RequestGithub.sendGetRequest(
      "https://api.github.com/user/repos",
      new Map<string, string>([
        ["affiliation", "owner,collaborator"]
      ]),
      this.token) as RepoApiModel[]
    return repos;
  }


  public async scrapeIssues(username: string) : Promise<IssueApiModel[]>{
    const issues =  await RequestGithub.sendGetRequest(
      "https://api.github.com/search/issues",
      new Map<string, string>([
        ["involves", username],
        ["is", "issues" ]
      ]),
      this.token) as IssueApiModel[]
    return issues;
  }

  public async scrapePullRequests(username: string) : Promise<IssueApiModel[]>{
    const prs =  await RequestGithub.sendGetRequest(
      "https://api.github.com/search/issues",
      new Map<string, string>([
        ["involves", username],
        ["is", "pr" ]
      ]),
      this.token) as IssueApiModel[]
    return prs;
  }


  /* BROKEN
  public async scrapeBranches(repoID: string): Promise<BranchApiModel[]> {
    const branches = await RequestGithub.sendGetRequest(
        `https://api.github.com/repositories/${repoID}/branches`,
        new Map<string, string>(),
        this.token
    ) as BranchApiModel[];
    return branches;
  }
  */



}