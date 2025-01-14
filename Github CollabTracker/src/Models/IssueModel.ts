export class IssueModel {
  private id: number;
  private html: string;
  private creator: number;
  private assignees: number[];
  private numberOfComments: number;
  private reviewers: number[];
  private updated_at: Date;
  private repoID: number;
  private isPullRequest: boolean;

  constructor(id: number, html: string, creator: number, assignees: number[], numberOfComments: number, reviewers: number[], updated_at: Date, repoID: number, isPullRequest: boolean){
    this.id = id;
    this.html = html;
    this.creator = creator;
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

  public static createNew(mod: IssueModel): IssueModel {
    return new IssueModel(mod.id, mod.html, mod.creator, mod.assignees, mod.numberOfComments, mod.reviewers, mod.updated_at, mod.repoID, mod.isPullRequest);
  }
}