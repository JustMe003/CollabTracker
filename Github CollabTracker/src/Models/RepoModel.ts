import { BranchModel } from "./BranchModel";
import { IssueModel } from "./IssueModel";
import { RepoEventModel } from "./RepoEventModel";

export class RepoModel {
  private repoID: number;
  private html: string;
  private creatorID: number;
  private updated_at: Date;
  private branches: Map<string, BranchModel>;
  private issues: Map<number, IssueModel>;
  private mergeRequests: Map<number, IssueModel>;
  private repoEvents: RepoEventModel[];


  constructor(repoID: number, html: string, creatorID: number, updated_at: Date, branches: Map<string, BranchModel>, issues: Map<number, IssueModel>, mergeRequests: Map<number, IssueModel>,
    repoEvents: RepoEventModel[]) {
    this.repoID = repoID;
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