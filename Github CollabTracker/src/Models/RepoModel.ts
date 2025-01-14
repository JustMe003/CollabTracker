import { IssueObject } from "./GenericNumberObjects";
import { BranchObject } from "./GenericStringObject";
import { IssueModel } from "./IssueModel";
import { RepoEventModel } from "./RepoEventModel";

export class RepoModel {
  private repoID: number;
  private name: string;
  private html: string;
  private creatorID: number;
  private updated_at: Date;
  private branches: BranchObject;
  private issues: IssueObject;
  private mergeRequests: Map<number, IssueModel>;
  private repoEvents: RepoEventModel[];


  constructor(repoID: number, name: string, html: string, creatorID: number, updated_at: Date, branches: BranchObject = {}, 
      issues: IssueObject = {}, mergeRequests: Map<number, IssueModel> = new Map(), repoEvents: RepoEventModel[] = []) {
    this.repoID = repoID;
    this.name = name;
    this.html = html;
    this.creatorID = creatorID;
    this.updated_at = updated_at;
    this.branches = branches;
    this.issues = issues;
    this.mergeRequests = mergeRequests;
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

  public getUpdatedAt() {
    return this.updated_at;
  }

  public getBranches() {
    return this.branches;
  }

  public getIssues() {
    return this.issues;
  }

  public getMergeRequests() {
    return this.mergeRequests;
  }

  public getEvents() {
    return this.repoEvents;
  }

}