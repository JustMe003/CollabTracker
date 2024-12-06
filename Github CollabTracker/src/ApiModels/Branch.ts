import { User } from "./User";

export class Branch{
  public creator: User;
  public sha: string;
  
  constructor(creator:User, sha:string){
    this.creator = creator;
    this.sha = sha;
  }
}