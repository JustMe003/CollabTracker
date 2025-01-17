import { Scraper } from "../ApiScraper/Scraper";
import { BranchModel, BranchObject, CommitsModel, getNumberObjectList, IssueModel, IssueObject, RepoModel, RepoObject, UserModel, UserObject } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, RepoModelConverter, UserModelConverter } from "../ModelConverter";
import { MetaData } from "../Models/MetaData";
import { IssueDataManager } from "./IssueDataManager";
import { CommentersObjectConverter } from "../ModelConverter/CommentersObjectConverter";
import { CommitModelConverter } from "../ModelConverter/CommitModelConverter";
import { EventModel } from "../Models/EventModel";
import { CommentersObject, getStringObjectList } from "../Models/GenericStringObject";

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;
  private storageRepos: RepoObject = {};
  private users: UserObject = {};
  private localUser: UserModel;

  constructor(scraper: Scraper, handler: IOHandler, localUser: UserModel) {
    this.scraper = scraper;
    this.IOHandler = handler;
    this.localUser = localUser;
  }

  public async updateData() {
    // Start initializing
    const metaData = await this.readMetaData();
    this.storageRepos = await this.readRepos();
    this.users = await this.readUsers();
    const scrapeReps = this.updateRepos(metaData.getLastUpdated());
    
    // Await scraping all issues and repos;
    const allIssues = await this.updateIssues(metaData);
    // DOes not update it anywhere
    const repoPromises = await scrapeReps;

    for (let i = 0; i < repoPromises.length; i++) {
      await repoPromises[i];
    }
    
    const newIssues = this.getNewRepoIssues(allIssues); // Filter all issues we don't have a repo for
    
    // Scrape minimum repo to store the issues
    const promises: Promise<RepoModel>[] = [];
    newIssues.forEach((obj, key) => {
      promises.push(this.createNewRepoFromIssue(key, obj));
    });

    for (let i = 0; i < promises.length; i++) {
      const res = await promises[i];
      this.storageRepos[res.getRepoID()] = res;
    }

    // Merge the issues with their respective repos
    const issueMergePromises: Promise<void>[][] = [];
    getNumberObjectList<RepoModel, RepoObject>(this.storageRepos).forEach((pair: [number, RepoModel]) => {
      issueMergePromises.push(this.mergeRepoWithIssues(pair[1], allIssues.get(pair[0]) || {}));
    });
    for (let i = 0; i < issueMergePromises.length; i++) {
      const arr = issueMergePromises[i];
      for (let j = 0; j < arr.length; j++) {
        await arr[j];
      }
    }

    
    // updateBranches()
    // const repos = await this.readRepos();
    metaData.resetLastUpdated();
    this.writeMetaData();
    this.writeRepos();
    this.writeUsers();
  }


  public async updateRepos(updatedAt: Date): Promise<Promise<void>[]> {
    const scrapedRepos = await this.scrapeRepos();
    const promises: Promise<void>[] = [];
    getNumberObjectList<RepoModel, RepoObject>(scrapedRepos).forEach((pair: [number, RepoModel]) => {
      const id = pair[1].getRepoID();
      if (!this.storageRepos[id]) {
        // repo does not exists in storage
        promises.push(this.scrapeDefaultBranch(pair[1], updatedAt).then(br => {
          pair[1].setBranches(br);
          this.storageRepos[pair[0]] = pair[1];
        }));
      }
    });
    return promises;
  }

  public async updateIssues(metaData: MetaData): Promise<Map<number, IssueObject>> {
    return await IssueDataManager.scrapeIssues(this.scraper, metaData.getLastUpdated());
  }

  public getNewRepoIssues(map: Map<number, IssueObject>): Map<number, IssueObject> {
    const res = new Map<number, IssueObject>();
    map.forEach((obj, key) => {
      if (!this.repoInStorage(key)) res.set(key, obj);
    });
    return res;
  }

  public mergeRepoWithIssues(repo: RepoModel, issues: IssueObject): Promise<void>[] {
    const repoIssues = repo.getIssues();
    const repoPullReqs = repo.getPullRequests();
    const promises: Promise<void>[] = [];
    getNumberObjectList<IssueModel, IssueObject>(issues).forEach((pair: [number, IssueModel]) => {
      const issue = repoIssues[pair[0]];
      if (!issue 
      || issue.getNumberOfComments() != pair[1].getNumberOfComments() 
      || issue.getUpdatedAt() < pair[1].getUpdatedAt()) {
        promises.push(this.scraper.scrapeComments(repo.getCreator(), repo.getName(), pair[0]).then(async (comments) => {
          pair[1].setCommenters(CommentersObjectConverter.convert(comments));
          if (pair[1].getIsPullRequest()) {
            await this.updateEvents(repo, repoPullReqs[pair[0]], pair[1], false)
            repoPullReqs[pair[0]] = pair[1];
          } else {
            await this.updateEvents(repo, repoIssues[pair[0]], pair[1], true)
            repoIssues[pair[0]] = pair[1];
          }
        }));
      }
    });
    return promises;
  }

  public async updateEvents(repo: RepoModel, pastIssue:IssueModel, newIssue: IssueModel, isIssue: boolean){
    const repoEvents = repo.getEvents();
    console.log("Repo", repo)
    console.log("Old Issue", pastIssue)
    console.log("new issue", newIssue)
    let events: EventModel[] = [];
    if(isIssue && repoEvents.getIssueEvents()) {
      events = repoEvents.getIssueEvents();
    } else if (repoEvents.getMergeRequestEvents()) {
      events = repoEvents.getMergeRequestEvents()
    }
    if(await IssueDataManager.checkCollaborator(newIssue, this.localUser.getLogin())) {
      const newComments: Map<string, number> = new Map<string, number>;
      getStringObjectList<number, CommentersObject>(newIssue.getCommenters()).forEach((pair: [string, number]) => {
        if(pastIssue != undefined) {
          const pastComments = pastIssue.getCommenters();
          if(pastComments[pair[0]])
            newComments.set(pair[0], pair[1] - pastComments[pair[0]])
        } else 
        newComments.set(pair[0], pair[1])
      });
      let userNewComments:number | undefined = newComments.get(this.localUser.getLogin()) ;
      newComments.delete(this.localUser.getLogin())
      for (let [key, value] of newComments) {
        let totalEvents: number = 0;
        if(userNewComments != undefined)
          totalEvents  = userNewComments;
        else
        totalEvents = 0;
        totalEvents += value;
        console.log(key, totalEvents)
        for(let i=0; i<totalEvents; i++) {
          const event = new EventModel(key, "COMMENTER-COMMENTER", undefined, newIssue.getID())
          events.push(event);
        }
      }
      console.log("Events", events);
      if(isIssue){
        repoEvents.setIssueEvents(events)
      } else{
        repoEvents.setMergeRequests(events)
      }
    }

  }

  public repoInStorage(repId: number): boolean {
    return this.storageRepos[repId] != undefined;
  }

  public async scrapeRepos(): Promise<RepoObject> {
    const res = await this.scraper.scrapeRepos();
    const repos: RepoModel[] = [];
    res.forEach(repo => {
      repos.push(RepoModelConverter.convert(repo));
    });
    return this.repoModelsToObject(repos);
  }

  public async scrapeRepo(id: number): Promise<RepoModel> {
    return RepoModelConverter.convert(await this.scraper.scrapeRepoFromId(id.toString()));
  }

  public async createNewRepoFromIssue(key: number, issues: IssueObject): Promise<RepoModel> {
    const res = await this.scrapeRepo(key);
    const split = IssueDataManager.seperateIssuesPullRequests(issues);
    res.setIssues(split.issues);
    res.setPullRequests(split.pullRequests);
    return res;
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

  public async scrapeDefaultBranch(rep: RepoModel, updatedAt: Date): Promise<BranchObject> {
    const res = await this.scraper.scrapeCommits(rep.getCreator(), rep.getName(), rep.getDefaultBranch(), updatedAt);
    const commits: CommitsModel[] = [];
    res.forEach(commit => {
      commits.push(CommitModelConverter.convert(commit));
    });
    console.log("scraping commits from " + rep.getName() + " done!");
    return { [rep.getDefaultBranch()]: new BranchModel(rep.getDefaultBranch(), updatedAt, commits) };
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

}