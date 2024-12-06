import { User } from "./UserModel";

export class IssueModel{
  public html:string;
  public creator:User;
  public assignees:[User];
  public numberOfComments: number;
  public reviewers: [User];

  constructor(html: string, creator: User, assignees: [User], numberOfComments: number, reviewers: [User]){
    this.html = html;
    this.creator = creator;
    this.assignees = assignees;
    this.numberOfComments = numberOfComments;
    this.reviewers = reviewers;
  }
}