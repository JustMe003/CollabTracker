import { Scraper } from "../ApiScraper/Scraper";
import { BranchObject, IssueObject, RepoModel, RepoObject, UserModel, UserObject } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, IssueModelConverter, RepoModelConverter, UserModelConverter } from "../ModelConverter";

type IssuePullRequestObject = { issues: IssueObject, pullRequests: IssueObject };

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;
  private repos: RepoObject = {};
  private users: UserObject = {};
  private initialized: boolean = false;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
    this.IOHandler = handler;
  }

  public async updateData() {
    const repos = this.readRepos();
    const users = this.readUsers();

    this.updateRepos();
    
    this.repos = await repos;
    this.users = await users;
    this.initialized = true;

    // updateIssues()
    // updateMergeRequests()
    // updateBranches()
    //const repos = await this.readRepos();
    
  }

  public async updateRepos() {
    const scrapedRepos = await this.scrapeRepos();
    while (!this.initialized);
    Object.entries(scrapedRepos).forEach((pair: [string, RepoModel]) => {
      const id = pair[1].getRepoID();
      if (!this.repos[id]) {
        // repo does not exists in storage
        // this.scrapeFullRepo(pair[1]); 
      }
    });
  }

  public async scrapeRepos(): Promise<RepoObject> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    res.forEach(repo => {
      repos.push(RepoModelConverter.convert(repo));
    })
    return this.repoModelsToObject(repos);
  }

  public async scrapeFullRepo(rep: RepoModel): Promise<void> {
    if (!this.users[rep.getCreator()]) this.users[rep.getCreator()] = await this.scrapeUser("");
    console.log(this.users[rep.getCreator()]);
    const repo = this.scraper.scrapeRepo(this.users[rep.getCreator()].getLogin(), rep.getName());
    console.log(repo);
  }

  public async scrapeUser(user: string): Promise<UserModel> {
    return UserModelConverter.convert(await this.scraper.scrapeUser(user));
  }


  // public async scrapeRepos(issueObjects: Map<number, IssueObject>): Promise<RepoModel[]> {
  //   const res = await this.scraper.scrapeRepos();
  //   const repos: RepoModel[] = [];
  //   for (let i = 0; i < res.length; i++) {
  //     const repo = res[i];
  //     let branches: BranchObject = await this.scrapeBranches(repo.owner.login, repo.name);
  //     const seperate = this.seperateIssuesPullRequests(issueObjects.get(repo.id));
  //     repos.push(RepoModelConverter.convert(repo, branches, seperate.issues, seperate.pullRequests));
  //   }
  //   return repos;
  // }
  
  public async scrapeBranches(owner: string, repoName: string): Promise<BranchObject> {
    const res = await this.scraper.scrapeBranches(owner, repoName);
    const branches: BranchObject = {};
    res.forEach(async (e) => {
      const lastCommit = await this.scraper.scrapeLastUpdatedBranch(e.commit.url); 
      branches[e.name] = BranchModelConverter.convert(e, lastCommit);
    });
    return branches;
  }
  
  public async scrapeIssues(): Promise<Map<number, IssueObject>> {
    const res = await this.scraper.scrapeIssues();
    const issues = new Map<number, IssueObject>();
    res.forEach((e) => {
      const issue = IssueModelConverter.convert(e);
      let issueMap = issues.get(issue.getRepoID());
      if (!issueMap) {
        issueMap = {};
        issues.set(issue.getRepoID(), issueMap);
      }
      issueMap[issue.getID()] = issue;
    })
    return issues;
  }

  public async readRepos(): Promise<RepoObject> {
    return this.repoModelsToObject(await this.IOHandler.getRepos());
  }

  public async readUsers(): Promise<UserObject> {
    return this.userModelToObject(await this.IOHandler.getUsers());
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }

  private repoModelsToObject(repos: RepoModel[]): RepoObject {
    const obj: RepoObject = {};
    repos.forEach(repo => {
      obj[repo.getRepoID()] = repo;
    });
    return obj;
  }

  private userModelToObject(users: UserModel[]): UserObject {
    const obj: UserObject = {};
    users.forEach(user => {
      obj[user.getLogin()] = user;
    });
    return obj;
  }

  public seperateIssuesPullRequests(all: IssueObject | null | undefined): IssuePullRequestObject  {
    const issues: IssueObject = {};
    const pullReqs: IssueObject = {};
    if (all) {
      Object.entries(all).forEach((pair) => {
        if (pair[1].getIsPullRequest()) {
          pullReqs[pair[1].getID()] = pair[1];
        } else {
          issues[pair[1].getID()] = pair[1];
        }
      });
    }
    return {
      issues: issues,
      pullRequests: pullReqs
    };
  }
}