import {UserApiModel} from "./UserApiModel"

export interface RepoApiModel{
  id: string;
  html_url: string;
  owner: UserApiModel;
}