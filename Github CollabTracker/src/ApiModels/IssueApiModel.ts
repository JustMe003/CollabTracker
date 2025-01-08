import { UserApiModel } from "./UserApiModel";

export interface IssueApiModel{
  html:string;
  id: number;
  creator:UserApiModel;
  assignees:[UserApiModel];
  numberOfComments: number;
  reviewers: [UserApiModel];
  updated_at: Date;

}