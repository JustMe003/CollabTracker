import {UserApiModel} from "./UserApiModel"

export interface RepoApiModel{
  id: number;
  html_url: string;
  updated_at: Date;
  owner: UserApiModel;
  name: string;
}