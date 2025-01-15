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
  private branches: BranchObject;
  private issues: IssueObject;
  private pullRequests: IssueObject;
  private repoEvents: RepoEventModel[];


  constructor(repoID: number, name: string, html: string, creatorLogin: string, branches: BranchObject = {}, 
      issues: IssueObject = {}, pullRequests: IssueObject = {}, repoEvents: RepoEventModel[] = []) {
    this.repoID = repoID;
    this.name = name;
    this.html = html;
    this.creatorLogin = creatorLogin;
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
    Object.entries(mod.issues).forEach((pair: [string, IssueModel]) => {
      pullReqs[parseInt(pair[0])] = IssueModel.createNew(pair[1]);
    });
    return new RepoModel(mod.repoID, mod.name, mod.html, mod.creatorLogin, branches, issues, pullReqs, mod.repoEvents);
  }

}