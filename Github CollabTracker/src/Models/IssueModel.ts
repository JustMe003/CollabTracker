import { UserModel } from "./UserModel";

export class IssueModel{
  public html:string;
  public creator:UserModel;
  public assignees:[UserModel];
  public numberOfComments: number;
  public reviewers: [UserModel];

  constructor(html: string, creator: UserModel, assignees: [UserModel], numberOfComments: number, reviewers: [UserModel]){
    this.html = html;
    this.creator = creator;
    this.assignees = assignees;
    this.numberOfComments = numberOfComments;
    this.reviewers = reviewers;
  }
}