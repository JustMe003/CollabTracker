import { BranchModel } from "./BranchModel";
import { IssueObject } from "./GenericNumberObjects";
import { BranchObject } from "./GenericStringObject";
import { IssueModel } from "./IssueModel";
import { RepoEventModel } from "./RepoEventModel";

export class RepoModel {
  private repoID: number;
  private name: string;
  private html: string;
  private creatorLogin: string;
  private defaultBranch: string;
  private branches: BranchObject;
  private issues: IssueObject;
  private pullRequests: IssueObject;
  private repoEvents: RepoEventModel;


  constructor(repoID: number, name: string, html: string, creatorLogin: string, defaultBranch: string, branches: BranchObject = {}, 
      issues: IssueObject = {}, pullRequests: IssueObject = {}, repoEvents: RepoEventModel = new RepoEventModel()) {
    this.repoID = repoID;
    this.name = name;
    this.html = html;
    this.creatorLogin = creatorLogin;
    this.defaultBranch = defaultBranch;
    this.branches = branches;
    this.issues = issues;
    this.pullRequests = pullRequests;
    this.repoEvents = repoEvents;
  }
  

  public getRepoID() {
    return this.repoID;
  }

  public getName() {
    return this.name;
  }

  public getHtml() {
    return this.html;
  }

  public getCreator() {
    return this.creatorLogin;
  }

  public getDefaultBranch() {
    return this.defaultBranch;
  }

  public getBranches() {
    return this.branches;
  }

  public getIssues() {
    return this.issues;
  }

  public getPullRequests() {
    return this.pullRequests;
  }

  public getEvents() {
    return this.repoEvents;
  }

  public setBranches(branches: BranchObject) {
    this.branches = branches;
  }

  public setIssues(issues: IssueObject) {
    this.issues = issues;
  }

  public setPullRequests(pullReqs: IssueObject) {
    this.pullRequests = pullReqs;
  }

  public setEvents(events: RepoEventModel) {
    this.repoEvents = events;
  }

  public static createNew(mod: RepoModel): RepoModel {
    const branches: BranchObject = {};
    Object.entries(mod.branches).forEach((pair: [string, BranchModel]) => {
      branches[pair[0]] = BranchModel.createNew(pair[1]);
    });
    const issues: IssueObject = {};
    Object.entries(mod.issues).forEach((pair: [string, IssueModel]) => {
      issues[parseInt(pair[0])] = IssueModel.createNew(pair[1]);
    });
    const pullReqs: IssueObject = {};
    Object.entries(mod.pullRequests).forEach((pair: [string, IssueModel]) => {
      pullReqs[parseInt(pair[0])] = IssueModel.createNew(pair[1]);
    });
    const newRepoEvent: RepoEventModel = RepoEventModel.createNew(mod.repoEvents)
    return new RepoModel(mod.repoID, mod.name, mod.html, mod.creatorLogin, mod.defaultBranch, branches, issues, pullReqs, newRepoEvent);
  }

}