import { Scraper } from "../ApiScraper/Scraper";
import * as models from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { BranchModelConverter, CommentersObjectConverter, CommitModelConverter, RepoModelConverter, UserModelConverter } from "../ModelConverter";
import { IssueDataManager } from "./IssueDataManager";
import { EventManager } from "./EventManager";
/**
 * issue {
 *  creator: name
 *  commenters: {name: number}
 *  assignees: [name]
 *  reviewers: [name]
 * }
 * 
 * UserRoleObject { // indexed by username
 *  Name: { // also indexed by username
 *    developer: number
 *    commenter: number
 *    administrator: number
 *  }
 * }
 * 
 * JustMe003: {
 *  R-Selaru: {
 *    developer: 0
 *    commenter: 3
 *    administrator: 1 
 *  },
 *  Bob: {
 *    
 * }
 * }
 * R-Selaru: {
 *  JustMe003: {
 *    developer: 0
 *    commenter: 3
 *    administrator: 1
 *  },
 *  Bob: {
 *    developer: 2,
 *    commenter: 0,
 *    administrator: 0
 *  }
 * }
 * 
 */


export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;
  private storageRepos: models.RepoObject = {};
  private localUser: models.UserModel;

  constructor(scraper: Scraper, handler: IOHandler, localUser: models.UserModel) {
    this.scraper = scraper;
    this.IOHandler = handler;
    this.localUser = localUser;
  }

  public async updateData() {
    // Start initializing
    const metaData = await this.readMetaData();
    this.storageRepos = await this.readRepos();
    const scrapeReps = this.updateRepos(metaData.getLastUpdated());
    console.log("Storage", this.storageRepos)
    // Await scraping all issues and repos;
    const allIssues = await this.updateIssues(metaData);
    // Does not update it anywhere
    const repoPromises = await scrapeReps;

    for (let i = 0; i < repoPromises.length; i++) {
      await repoPromises[i];
    }
    
    const newIssues = this.getNewRepoIssues(allIssues); // Filter all issues we don't have a repo for
    
    // Scrape minimum repo to store the issues
    const promises: Promise<models.RepoModel>[] = [];
    newIssues.forEach((obj, key) => {
      promises.push(this.createNewRepoFromIssue(key, obj));
    });
    for (let i = 0; i < promises.length; i++) {
      const res = await promises[i];
      this.storageRepos[res.getRepoID()] = res;
    }

    // Merge the issues with their respective repos
    const issueMergePromises: Promise<void>[][] = [];
    models.getNumberKeys(this.storageRepos).forEach((key: number) => {
      issueMergePromises.push(this.mergeRepoWithIssues(this.storageRepos[key], allIssues.get(key) || {}));
    });
    for (let i = 0; i < issueMergePromises.length; i++) {
      const arr = issueMergePromises[i];
      for (let j = 0; j < arr.length; j++) {
        await arr[j];
      }
    }

    console.log(this.storageRepos);
    
    // updateBranches()
    // const repos = await this.readRepos();
    metaData.resetLastUpdated();
    this.writeMetaData();
    this.writeRepos();
  }


  public async updateRepos(updatedAt: Date): Promise<Promise<void>[]> {
    const scrapedRepos = await this.scrapeRepos();
    const promises: Promise<void>[] = [];
    models.getNumberKeys(scrapedRepos).forEach((key: number) => {
      const repo = scrapedRepos[key];
      promises.push(this.scrapeDefaultBranch(repo).then(br => {
        repo.setBranches(br);
        EventManager.updateCommitEvents(repo, br);
      }));
      if (!this.storageRepos[key]) {
        // repo does not exists in storage
        this.storageRepos[key] = repo;
      }
    });
    return promises;
  }

  public async updateIssues(metaData: models.MetaData): Promise<Map<number, models.IssueObject>> {
    return await IssueDataManager.scrapeIssues(this.scraper, metaData.getLastUpdated());
  }

  public getNewRepoIssues(map: Map<number, models.IssueObject>): Map<number, models.IssueObject> {
    const res = new Map<number, models.IssueObject>();
    map.forEach((obj, key) => {
      if (!this.repoInStorage(key)) res.set(key, obj);
    });
    return res;
  }

  public mergeRepoWithIssues(repo: models.RepoModel, issues: models.IssueObject): Promise<void>[] {
    const repoIssues = repo.getIssues();
    const repoPullReqs = repo.getPullRequests();
    const promises: Promise<void>[] = [];
    models.getNumberKeys(issues).forEach((key: number) => {
      let repoIssue = repoIssues[key];
      if(!repoIssue)
        repoIssue = repoPullReqs[key]
      const issue = issues[key];
      if (!repoIssue 
        || repoIssue.getNumberOfComments() != issue.getNumberOfComments() 
        || repoIssue.getUpdatedAt() < issue.getUpdatedAt()) {
        promises.push(this.scraper.scrapeComments(repo.getCreator(), repo.getName(), key).then(async (comments) => {
          issue.setCommenters(CommentersObjectConverter.convert(comments));
          console.log("Enters on this", issue)
          if (!issue.getIsPullRequest()) {
            await this.updateEvents(repo, repoIssues[key], issue);
            repoIssues[key] = issue;
          } else {
            await this.updateEvents(repo, repoPullReqs[key], issue);
            repoPullReqs[key] = issue;
          }
        }));
      }
    });
    return promises;
  }

  public async updateEvents(repo: models.RepoModel, pastIssue: models.IssueModel, newIssue: models.IssueModel){
    const pastEvents = repo.getCollaborations();
    //console.log("Previous", repo.getName(), pastEvents);
    //console.log("Past issue", pastIssue)
    EventManager.createAssigneeEvents(pastIssue, newIssue, pastEvents);
    //console.log("Current 1", repo.getName(), pastEvents);
    EventManager.createAssigneeCommentator(pastIssue, newIssue, pastEvents);
    //console.log("current 2", repo.getName(), pastEvents);
  }

  public repoInStorage(repId: number): boolean {
    return this.storageRepos[repId] != undefined;
  }

  public async scrapeRepos(): Promise<models.RepoObject> {
    const res = await this.scraper.scrapeRepos();
    const repos: models.RepoModel[] = [];
    res.forEach(repo => {
      repos.push(RepoModelConverter.convert(repo));
    });
    return this.repoModelsToObject(repos);
  }

  public async scrapeRepo(id: number): Promise<models.RepoModel> {
    return RepoModelConverter.convert(await this.scraper.scrapeRepoFromId(id.toString()));
  }

  public async createNewRepoFromIssue(key: number, issues: models.IssueObject): Promise<models.RepoModel> {
    const res = await this.scrapeRepo(key);
    const split = IssueDataManager.seperateIssuesPullRequests(issues);
    res.setIssues(split.issues);
    res.setPullRequests(split.pullRequests);
    return res;
  }

  public async scrapeUser(user: string): Promise<models.UserModel> {
    return UserModelConverter.convert(await this.scraper.scrapeUser(user));
  }

  public async scrapeBranches(owner: string, repoName: string): Promise<models.BranchObject> {
    const res = await this.scraper.scrapeBranches(owner, repoName);
    const branches: models.BranchObject = {};
    res.forEach(async (e) => {
      const lastCommit = await this.scraper.scrapeLastUpdatedBranch(e.commit.url); 
      branches[e.name] = BranchModelConverter.convert(e, lastCommit);
    });
    return branches;
  }

  public async scrapeDefaultBranch(rep: models.RepoModel, updatedAt: Date = new Date("2006-01-01T00:00:00")): Promise<models.BranchObject> {
    const res = await this.scraper.scrapeCommits(rep.getCreator(), rep.getName(), rep.getDefaultBranch(), updatedAt);
    const commits: models.CommitsModel[] = [];
    res.forEach(commit => {
      commits.push(CommitModelConverter.convert(commit));
    });
    console.log("scraping commits from " + rep.getName() + " done!");
    return { [rep.getDefaultBranch()]: new models.BranchModel(rep.getDefaultBranch(), new Date(), commits) };
  }

  public async readRepos(): Promise<models.RepoObject> {
    return this.repoModelsToObject(await this.IOHandler.getRepos());
  }
  
  public async readUsers(): Promise<models.UserObject> {
    return this.userModelToObject(await this.IOHandler.getUsers());
  }

  public writeRepos() {
    this.IOHandler.writeRepos(this.storageRepos);
  }
  
  public async readMetaData(): Promise<models.MetaData> {
    return await this.IOHandler.getMetaData();
  }

  public writeMetaData() {
    this.IOHandler.writeMetaData(new models.MetaData(new Date()));
  }

  private repoModelsToObject(repos: models.RepoModel[]): models.RepoObject {
    const obj: models.RepoObject = {};
    repos.forEach(repo => {
      obj[repo.getRepoID()] = repo;
    });
    return obj;
  }

  private userModelToObject(users: models.UserModel[]): models.UserObject {
    const obj: models.UserObject = {};
    users.forEach(user => {
      obj[user.getLogin()] = user;
    });
    return obj;
  }

  public async getUserCollaborations() : Promise<Map<string, number>> {
    const allCollabs = new Map<string, number>
    this.storageRepos = await this.readRepos();
    Object.entries(this.storageRepos).forEach((pair: [string, models.RepoModel]) => {
      const collabs = pair[1].getCollaborations()
      if(collabs[this.localUser.getLogin()]) {
        Object.entries(collabs[this.localUser.getLogin()]).forEach((event: [string, models.EventModel]) => {
          const previousValue = allCollabs.get(event[0]) ?? 0;
          allCollabs.set(event[0], previousValue + event[1].getAdminEntries() + event[1].getDeveloperEntries() + event[1].getCommentatorEvents())
        })
      }
    })
    return allCollabs;

  }

  public async getMaxUserCollaborationsRepo() : Promise<Map<string, [string, number]>> {
    const allCollabs = new Map<string, [string, number]>
    this.storageRepos = await this.readRepos();
    Object.entries(this.storageRepos).forEach((pair: [string, models.RepoModel]) => {
      const collabs = pair[1].getCollaborations()
      let max = 0;
      let user = "";
      if(collabs[this.localUser.getLogin()]) {
        Object.entries(collabs[this.localUser.getLogin()]).forEach((event: [string, models.EventModel]) => {
          if(event[1].getAdminEntries() + event[1].getDeveloperEntries() + event[1].getCommentatorEvents() > max) {
            max = event[1].getAdminEntries() + event[1].getDeveloperEntries() + event[1].getCommentatorEvents()
            user = event[0]
          }
        })
        allCollabs.set(pair[1].getName(), [user, max])
      }
    })

    return allCollabs;
  }

  public async getRepoCollaborations(repoID: number) : Promise<Map<[string, string] , number>> {
    const allCollabs = new Map<[string, string] , number>
    this.storageRepos = await this.readRepos();
    const repo = this.storageRepos[repoID]
    const collabs = repo.getCollaborations()
    Object.keys(collabs).forEach(user => {
      Object.entries(collabs[user]).forEach((pair: [string, models.EventModel]) => {
        allCollabs.set([user, pair[0]], pair[1].getAdminEntries() + pair[1].getDeveloperEntries() + pair[1].getCommentatorEvents())
      })
    })
    return allCollabs;
  }
}