import { User } from "./UserModel";

export class BranchModel{
  public creator: User;
  public sha: string;
  
  constructor(creator:User, sha:string){
    this.creator = creator;
    this.sha = sha;
  }
}