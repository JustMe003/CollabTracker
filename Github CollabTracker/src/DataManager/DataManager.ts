import { Scraper } from "../ApiScraper/Scraper";
import { BranchObject, getNumberObjectList, IssueModel, IssueObject, RepoModel, RepoObject, UserModel, UserObject } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, IssueModelConverter, RepoModelConverter, UserModelConverter } from "../ModelConverter";
import { MetaData } from "../Models/MetaData";
import { IssueApiModel } from "../ApiModels";

type IssuePullRequestObject = { issues: IssueObject, pullRequests: IssueObject };

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;
  private storageRepos: RepoObject = {};
  private users: UserObject = {};
  private initialized: boolean = false;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
    this.IOHandler = handler;
  }

  public async updateData() {
    const metaData = this.readMetaData();
    const repos = this.readRepos();
    const users = this.readUsers();
    const scrapeReps = this.updateRepos();
    
    this.storageRepos = await repos;
    this.users = await users;
    const lastUpdated = await metaData;
    this.initialized = true;
    
    
    let newIssues = await this.updateIssues(lastUpdated);
    console.log(newIssues);
    // await scrapeReps;
    
    newIssues = this.getNewRepoIssues(newIssues);
    console.log(newIssues);
    
    newIssues.forEach(async (obj, key) => {
      const res = await this.scrapeRepo(key);
      const split = this.seperateIssuesPullRequests(obj);
      res.setIssues(split.issues);
      res.setPullRequests(split.pullRequests);
      this.storageRepos[key] = res;
    });

    
    // updateBranches()
    //const repos = await this.readRepos();
    this.writeMetaData();
    this.writeRepos();
    this.writeUsers();
  }


  public async updateRepos() {
    const scrapedRepos = await this.scrapeRepos();
    while (!this.initialized);
    getNumberObjectList<RepoModel, RepoObject>(scrapedRepos).forEach((pair: [number, RepoModel]) => {
      const id = pair[1].getRepoID();
      if (!this.storageRepos[id]) {
        // repo does not exists in storage
        this.scrapeFullRepo(pair[1]);
      }
    });
  }

  public async updateIssues(metaData: MetaData): Promise<Map<number, IssueObject>> {
    const allIssues = await this.scrapeIssues(metaData.getLastUpdated());
    return this.getNewRepoIssues(allIssues);
  }

  public getNewRepoIssues(map: Map<number, IssueObject>): Map<number, IssueObject> {
    const res = new Map<number, IssueObject>();
    map.forEach((obj, key) => {
      if (!this.repoInStorage(key)) res.set(key, obj);
    });
    return res;
  }

  public repoInStorage(repId: number): boolean {
    return this.storageRepos[repId] != undefined;
  }

  public async scrapeRepos(): Promise<RepoObject> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    res.forEach(repo => {
      repos.push(RepoModelConverter.convert(repo));
    })
    return this.repoModelsToObject(repos);
  }

  public async scrapeRepo(id: number): Promise<RepoModel> {
    return RepoModelConverter.convert(await this.scraper.scrapeRepoFromId(id.toString()));
  }

  public async scrapeFullRepo(rep: RepoModel): Promise<RepoModel> {
    if (!this.users[rep.getCreator()]) 
      this.scrapeUser(rep.getCreator()).then((user) => this.users[rep.getCreator()] = UserModel.createNew(user));
    const branches = await this.scrapeBranches(rep.getCreator(), rep.getName());
    const repo = RepoModelConverter.convert(await this.scraper.scrapeRepo(rep.getCreator(), rep.getName()), branches);
    this.storageRepos[repo.getRepoID()];
    return repo;
  }

  public async scrapeUser(user: string): Promise<UserModel> {
    return UserModelConverter.convert(await this.scraper.scrapeUser(user));
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
  
  public async scrapeIssues(lastUpdated: Date): Promise<Map<number, IssueObject>> {
    const res = await this.scraper.scrapeIssues(lastUpdated);
    const issues = new Map<number, IssueObject>();
    const promises: Promise<IssueModel>[] = [];

    res.forEach((issue) => {
      promises.push(this.assignCommentsToIssue(issue));
    });

    for (let i = 0; i < promises.length; i++) {
      const res = await promises[i];
      let issueMap = issues.get(res.getRepoID());
      if (!issueMap) {
        issueMap = {};
        issues.set(res.getRepoID(), issueMap);
      }
      issueMap[res.getID()] = res;
    }
    return issues;
  }

  public async assignCommentsToIssue(issue: IssueApiModel): Promise<IssueModel> {
    const comments = await this.scraper.scrapeComments(issue.repository.owner.login, issue.repository.name, issue.number);
    return IssueModelConverter.convert(issue, comments);
  }

  public async readRepos(): Promise<RepoObject> {
    return this.repoModelsToObject(await this.IOHandler.getRepos());
  }
  
  public async readUsers(): Promise<UserObject> {
    return this.userModelToObject(await this.IOHandler.getUsers());
  }

  public writeRepos() {
    this.IOHandler.writeRepos(this.storageRepos);
  }

  public writeUsers() {
    this.IOHandler.writeUsers(this.users);
  }
  
  
  public async readMetaData(): Promise<MetaData> {
    return await this.IOHandler.getMetaData();
  }

  public writeMetaData() {
    this.IOHandler.writeMetaData(new MetaData(new Date()));
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
      getNumberObjectList<IssueModel, IssueObject>(all).forEach((pair) => {
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