import * as apiMod from "../ApiModels";
import { RequestGithub } from "../requestGithub";

export class Scraper {
  private token: string;
  private static perPage = 100;

  constructor(token: string) {
    this.token = token;
  }

  public async scrapeUs() : Promise<apiMod.UserApiModel> {
    const userData = await RequestGithub.sendGetRequest(
      "https://api.github.com/user",
      new Map<string, string>(),
      this.token) as apiMod.UserApiModel
    return userData;
  }

  public async scrapeUser(user: string) : Promise<apiMod.UserApiModel> {
    const userData = await RequestGithub.sendGetRequest(
      `https://api.github.com/users/${user}`,
      new Map<string, string>(),
      this.token) as apiMod.UserApiModel;
    return userData;
  }

  public async scrapeRepos(): Promise<apiMod.RepoApiModel[]> {
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

  public async scrapeRepo(owner: string, name: string): Promise<apiMod.RepoApiModel> {
    return await RequestGithub.sendGetRequest(
      `https://api.github.com/repos/${owner}/${name}`,
      new Map(),
      this.token) as apiMod.RepoApiModel;
  }

  public async scrapeRepoFromId(id: string): Promise<apiMod.RepoApiModel> {
    return await RequestGithub.sendGetRequest(
      `https://api.github.com/repositories/${id}`,
      new Map(),
      this.token) as apiMod.RepoApiModel;
  }


  public async scrapeIssues(lastUpdated: Date | undefined): Promise<apiMod.IssueApiModel[]> {
    let page = 1;
    let issues: apiMod.IssueApiModel[] = [];
    do {
      if (lastUpdated == undefined) {

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
        } else {
          issues = issues.concat(await RequestGithub.sendGetRequest(
            "https://api.github.com/user/issues",
            new Map<string, string>([
              ["filter", "all"],
              ["state", "all"],
              ["sort", "updated"],
              ["since", lastUpdated.toDateString()],
              ["per_page", Scraper.perPage.toString()],
              ["page", page.toString()]
            ]),
            this.token) as apiMod.IssueApiModel[]);
          }
      } while (issues.length / Scraper.perPage >= page++);
      return issues;
  }

  public async scrapeComments(owner: string, repoName: string, issueNumber: number): Promise<apiMod.CommentApiModel[]> {
    let page = 1;
    let comments: apiMod.CommentApiModel[] = [];
    do {
      comments = comments.concat(await RequestGithub.sendGetRequest(
        `https://api.github.com/repos/${owner}/${repoName}/issues/${issueNumber}/comments`,
        new Map<string, string>([
          ["per_page", Scraper.perPage.toString()],
          ["page", page.toString()]
        ]),
        this.token) as apiMod.CommentApiModel[]);
    } while (comments.length / Scraper.perPage >= page++);
    return comments;
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


  public async scrapeLastUpdatedBranch(url: string): Promise<apiMod.CommitsApiModel> {
    const lastCommit = await RequestGithub.sendGetRequest(
      url,
      new Map<string, string>(),
      this.token) as apiMod.CommitsApiModel
    return lastCommit;
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