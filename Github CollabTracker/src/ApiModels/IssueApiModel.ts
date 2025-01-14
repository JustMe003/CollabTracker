import { RepoApiModel } from "./RepoApiModel";
import { UserApiModel } from "./UserApiModel";

export interface IssueApiModel{
  html_url: string;
  number: number;
  user: UserApiModel;
  assignees: UserApiModel[];
  comments: number;
  reviewers: UserApiModel[];
  updated_at: Date;
  repository: RepoApiModel;
  pull_request: object
}