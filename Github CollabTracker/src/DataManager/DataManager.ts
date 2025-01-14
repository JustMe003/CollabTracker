import { Scraper } from "../ApiScraper/Scraper";
import { BranchObject, IssueModel, IssueObject, RepoModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, IssueModelConverter, RepoModelConverter } from "../ModelConverter";

type IssuePullRequestObject = { issues: IssueObject, pullRequests: IssueObject };

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
    this.IOHandler = handler;
  }

  public async updateData() {
    updateRepos()
    updateIssues()
    updateMergeRequests()
    updateBranches()
    //const repos = await this.readRepos();
    
  }


  public async scrapeRepos(issueObjects: Map<number, IssueObject>): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    for (let i = 0; i < res.length; i++) {
      const repo = res[i];
      let branches: BranchObject = await this.scrapeBranches(repo.owner.login, repo.name);
      const seperate = this.seperateIssuesPullRequests(issueObjects.get(repo.id));
      repos.push(RepoModelConverter.convert(repo, branches, seperate.issues, seperate.pullRequests));
    }
    return repos;
  }
  
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

  public readRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
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