import { UserModel } from "./UserModel";

export class BranchModel{
  public creator: UserModel;
  public sha: string;
  
  constructor(creator: UserModel, sha: string){
    this.creator = creator;
    this.sha = sha;
  }
}