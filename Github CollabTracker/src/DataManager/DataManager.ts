import { Scraper } from "../ApiScraper/Scraper";
import { BranchModel, BranchObject, IssueModel, RepoModel } from "../Models";
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
    const repos = await this.IOHandler.getRepos();
    if (repos.length == 0) await this.updateAll();
  }

  public async updateAll() {
    const issues = await this.updateIssues();
    const repos = await this.updateRepos(issues);
    this.IOHandler.writeRepos(repos);
  }

  public async updateRepos(issues: Map<number, Map<number, IssueModel>>): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    for (let i = 0; i < res.length; i++) {
      const e = res[i];
      let branches: BranchObject = await this.updateBranches(e.owner.login, e.name);
      repos.push(RepoModelConverter.convert(e, branches, new Map(), new Map()));
    }
    return repos;
  }
  
  public async updateBranches(owner: string, repoName: string): Promise<BranchObject> {
    const res = await this.scraper.scrapeBranches(owner, repoName);
    const branches: BranchObject = {};
    res.forEach(async (e) => {
      const lastCommit = await this.scraper.scrapeLastUpdatedBranch(e.branch.url); 
      branches[e.name] = BranchModelConverter.convert(e, lastCommit);
    });
    return branches;
  }
  
  public async updateIssues(): Promise<Map<number, Map<number, IssueModel>>> {
    const res = await this.scraper.scrapeIssues();
    const issues = new Map<number, Map<number, IssueModel>>();
    res.forEach((e) => {
      let issueMap = issues.get(e.repoID);
      if (!issueMap) {
        issueMap = new Map<number, IssueModel>();
      }
      issueMap.set(e.id, IssueModelConverter.convert(e));
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