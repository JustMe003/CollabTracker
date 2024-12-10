import {UserApiModel} from "./UserApiModel"

export interface RepoApiModel{
  repoID: string;
  html: string;
  creator: UserApiModel;
}