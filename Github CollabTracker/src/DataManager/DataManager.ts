import { Scraper } from "../ApiScraper/Scraper";
import { BranchModel, IssueModel, RepoModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, IssueModelConverter, RepoModelConverter } from "../ModelConverter";

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
    this.IOHandler = handler;
  }

  public async updateAll() {
    const issues = await this.updateIssues();
    const repos = await this.updateRepos(issues);
    console.log(issues);
    console.log(repos);
  }

  public async updateRepos(issues: Map<number, Map<number, IssueModel>>): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    const branches = new Map<string, BranchModel>();
    res.forEach((e) => {
      this.updateBranches(e.name).then((br) => {
        br.forEach((e) => {
          branches.set(e.getName(), e);
        });
      });
    });
    const repos: RepoModel[] = [];
    res.forEach((e) => {
      repos.push(RepoModelConverter.convert(e, branches, new Map(), new Map()));
    });
    return repos;
  }
  
  public async updateBranches(repoName: string): Promise<BranchModel[]> {
    const res = await this.scraper.scrapeBranches(repoName);
    const branches: BranchModel[] = [];
    res.forEach((e) => {
      branches.push(BranchModelConverter.convert(e));
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