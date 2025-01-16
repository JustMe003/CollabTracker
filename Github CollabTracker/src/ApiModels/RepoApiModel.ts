import {UserApiModel} from "./UserApiModel"

export interface RepoApiModel{
  id: number;
  html_url: string;
  owner: UserApiModel;
  name: string;
  default_branch: string;
}