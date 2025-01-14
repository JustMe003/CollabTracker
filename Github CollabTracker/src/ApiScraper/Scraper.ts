import * as apiMod from "../ApiModels";
import { RequestGithub } from "../requestGithub";

export class Scraper {
  private token: string;
  private static perPage = 100;

  constructor(token: string) {
    this.token = token;
  }

  public async scrapeUser() : Promise<apiMod.UserApiModel>{
    const userData = await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      this.token) as apiMod.UserApiModel
    return userData;
  }

  public async scrapeRepos() : Promise<apiMod.RepoApiModel[]>{
    let page = 1;
    let repos: apiMod.RepoApiModel[] = [];
    do {
      repos = repos.concat(await RequestGithub.sendGetRequest(
        "https://api.github.com/user/repos",
        new Map<string, string>([
          ["affiliation", "owner,collaborator"],
          ["sort", "updated"],
          ["per_page", Scraper.perPage.toString()],
          ["page", page.toString()]
        ]),
        this.token) as apiMod.RepoApiModel[]);
    } while (repos.length / Scraper.perPage >= page++);
    return repos;
  }


  public async scrapeIssues() : Promise<apiMod.IssueApiModel[]>{
    let page = 1;
    let issues: apiMod.IssueApiModel[] = [];
    do {

      issues = issues.concat(await RequestGithub.sendGetRequest(
        "https://api.github.com/user/issues",
        new Map<string, string>([
          ["filter", "all"],
          ["state", "all"],
          ["sort", "updated"],
          ["per_page", Scraper.perPage.toString()],
          ["page", page.toString()]
        ]),
        this.token) as apiMod.IssueApiModel[]);
      } while (issues.length / Scraper.perPage >= page++);
      return issues;
    }
    
  public async scrapePullRequests(username: string) : Promise<apiMod.IssueApiModel[]>{
    let page = 1;
    let pullRequests: apiMod.IssueApiModel[] = [];
    do {
      pullRequests = pullRequests.concat(await RequestGithub.sendGetRequest(
        "https://api.github.com/repos/{owner}/{repo}/pulls",
        new Map<string, string>([
          ["involves", username],
          ["is", "pr"],
          ["sort", "updated"],
          ["per_page", Scraper.perPage.toString()],
          ["page", page.toString()]
        ]),
        this.token) as apiMod.IssueApiModel[]);
      } while (pullRequests.length / Scraper.perPage >= page++);
      return pullRequests;
    }
      
      
  public async scrapeBranches(owner:string, repoID: string): Promise<apiMod.BranchApiModel[]> {
    let page = 1;
    let branches: apiMod.BranchApiModel[] = [];
    do {
      branches = branches.concat(await RequestGithub.sendGetRequest(
        `https://api.github.com/repos/${owner}/${repoID}/branches`,
        new Map<string, string>([
          ["per_page", Scraper.perPage.toString()],
          ["page", page.toString()]
        ]),
        this.token) as apiMod.BranchApiModel[]);
    } while (branches.length / Scraper.perPage >= page++);
    return branches;
  }

  public async scrapeCommits(owner:string, repoID: string, nameBranch:string, last_updated: Date | undefined): Promise<apiMod.CommitsApiModel[]> {
    let page = 1;
    let commits: apiMod.CommitsApiModel[] = [];
    do {
      if(last_updated == undefined) {
        commits = commits.concat(await RequestGithub.sendGetRequest(
          `https://api.github.com/repos/${owner}/${repoID}/commits`,
          new Map<string, string>([
            ["sha", nameBranch],
            ["per_page", Scraper.perPage.toString()],
            ["page", page.toString()]
          ]),
          this.token) as apiMod.CommitsApiModel[]);
      } else {
        commits = commits.concat(await RequestGithub.sendGetRequest(
          `https://api.github.com/repos/${owner}/${repoID}/commits`,
          new Map<string, string>([
            ["sha", nameBranch],
            ["since", last_updated.toDateString()],
            ["per_page", Scraper.perPage.toString()],
            ["page", page.toString()]
          ]),
          this.token) as apiMod.CommitsApiModel[]);
      }
    } while (commits.length / Scraper.perPage >= page++);
    return commits;
  }

}