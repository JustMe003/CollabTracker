import {User} from "./UserModel"

export class RepoModel{
  public repoID: string;
  public html: string;
  public creator: User;

  constructor(repoID:string, html:string, creator:User){
    this.repoID = repoID;
    this.html = html;
    this.creator = creator;
  }
}