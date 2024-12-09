import {UserModel} from "./UserModel"

export class RepoModel{
  public repoID: string;
  public html: string;
  public creator: UserModel;

  constructor(repoID: string, html: string, creator: UserModel){
    this.repoID = repoID;
    this.html = html;
    this.creator = creator;
  }
}