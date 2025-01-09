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
    const l: RepoModel[] = [];
    res.forEach((v) => {
      l.push(RepoModelConverter.convert(v));
    });
    return l;
  }
  
  public async updateBranches(repoName: string): Promise<BranchModel[]> {
    const res = await this.scraper.scrapeBranches(repoName);
    const l: BranchModel[] = [];
    res.forEach((e) => {
      l.push(BranchModelConverter.convert(e));
    });
    return l;
  }
  
  public async updateIssues(): Promise<IssueModel[]> {
    const res = await this.scraper.scrapeIssues();
    const l: IssueModel[] = [];
    res.forEach((e) => {
      l.push(IssueModelConverter.convert(e));
    });
    return l;
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }
}