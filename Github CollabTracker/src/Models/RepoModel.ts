import { IssueObject } from "./GenericNumberObjects";
import { BranchObject } from "./GenericStringObject";
import { RepoEventModel } from "./RepoEventModel";

export class RepoModel {
  private repoID: number;
  private name: string;
  private html: string;
  private creatorID: number;
  private branches: BranchObject;
  private issues: IssueObject;
  private pullRequests: IssueObject;
  private repoEvents: RepoEventModel[];


  constructor(repoID: number, name: string, html: string, creatorID: number, branches: BranchObject = {}, 
      issues: IssueObject = {}, pullRequests: IssueObject = {}, repoEvents: RepoEventModel[] = []) {
    this.repoID = repoID;
    this.name = name;
    this.html = html;
    this.creatorID = creatorID;
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
    return this.creatorID;
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

}