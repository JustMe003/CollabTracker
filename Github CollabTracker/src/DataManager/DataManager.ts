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
    const repos = await this.updateRepos();
    console.log(issues);
    console.log(repos);
  }

  public async updateRepos(): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    res.forEach((v) => {
      repos.push(RepoModelConverter.convert(v));
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
  
  public async updateIssues(): Promise<IssueModel[]> {
    const res = await this.scraper.scrapeIssues();
    const issues: IssueModel[] = [];
    res.forEach((e) => {
      issues.push(IssueModelConverter.convert(e));
    });
    return issues;
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }
}