import { CommentersObject } from "./GenericStringObject";

export class IssueModel {
  private id: number;
  private html: string;
  private creator: string;
  private assignees: string[];
  private numberOfComments: number;
  private commenters: CommentersObject;
  private reviewers: string[];
  private updated_at: Date;
  private repoID: number;
  private isPullRequest: boolean;

  constructor(id: number, html: string, creator: string, assignees: string[], numberOfComments: number, commenters: CommentersObject,
    reviewers: string[], updated_at: Date, repoID: number, isPullRequest: boolean){
    this.id = id;
    this.html = html;
    this.creator = creator;
    this.commenters = commenters;
    this.assignees = assignees;
    this.numberOfComments = numberOfComments;
    this.reviewers = reviewers;
    this.updated_at = updated_at;
    this.repoID = repoID;
    this.isPullRequest = isPullRequest
  }

  public getID() {
    return this.id;
  }

  public getHTML() {
    return this.html;
  }

  public getCommenters() {
    return this.commenters;
  }

  public getCreator() {
    return this.creator;
  }

  public getAssignees() {
    return this.assignees;
  }

  public getNumberOfComments() {
    return this.numberOfComments;
  }

  public getReviewers() {
    return this.reviewers;
  }

  public getUpdatedAt() {
    return this.updated_at;
  }

  public getRepoID() {
    return this.repoID;
  }  

  public getIsPullRequest() {
    return this.isPullRequest;
  }

  public setCommenters(commenters: CommentersObject) {
    this.commenters = commenters;
  }

  public static createNew(mod: IssueModel): IssueModel {
    return new IssueModel(mod.id, mod.html, mod.creator, mod.assignees, mod.numberOfComments, mod.commenters, 
      mod.reviewers, mod.updated_at, mod.repoID, mod.isPullRequest);
  }
}