import { UserApiModel } from "./UserApiModel";

export interface IssueApiModel{
  html:string;
  creator:UserApiModel;
  assignees:[UserApiModel];
  numberOfComments: number;
  reviewers: [UserApiModel];

}