import { Scraper } from "../ApiScraper/Scraper";
import { BranchObject, IssueObject, RepoModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, IssueModelConverter, RepoModelConverter } from "../ModelConverter";

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
    this.IOHandler = handler;
  }

  public async updateData() {
    const repos = this.IOHandler.getRepos();
    await this.updateAll();
  }

  public async updateAll() {
    const issues = await this.updateIssues();
    const repos = await this.updateRepos(issues);
    this.IOHandler.writeRepos(repos);
  }

  public async updateRepos(issues: Map<number, IssueObject>): Promise<RepoModel[]> {
    console.log(issues);
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    for (let i = 0; i < res.length; i++) {
      const repo = res[i];
      let branches: BranchObject = await this.updateBranches(repo.owner.login, repo.name);
      const tmp = issues.get(repo.id);
      if (tmp) {
        Object.entries(tmp).forEach((pair) => {
          console.log(pair[0], pair[1]);
        })
      }
      repos.push(RepoModelConverter.convert(repo, branches, issues.get(repo.id), new Map()));
    }
    return repos;
  }
  
  public async updateBranches(owner: string, repoName: string): Promise<BranchObject> {
    const res = await this.scraper.scrapeBranches(owner, repoName);
    const branches: BranchObject = {};
    res.forEach(async (e) => {
      const lastCommit = await this.scraper.scrapeLastUpdatedBranch(e.commit.url); 
      branches[e.name] = BranchModelConverter.convert(e, lastCommit);
    });
    return branches;
  }
  
  public async updateIssues(): Promise<Map<number, IssueObject>> {
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

  public getRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }
}