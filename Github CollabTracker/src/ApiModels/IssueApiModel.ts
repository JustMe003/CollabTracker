import { UserApiModel } from "./UserApiModel";

export interface IssueApiModel{
  html_url: string;
  id: number;
  user: UserApiModel;
  assignees: UserApiModel[];
  comments: number;
  reviewers: UserApiModel[];
  updated_at: Date;
  repoID: number;
}