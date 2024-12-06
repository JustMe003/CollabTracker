import { User } from "./User";

export class Commits{
  public nrOfContents: number;
  public users: [User];

  constructor(users:[User], nrOfContents:number){
    this.nrOfContents = nrOfContents;
    this.users = users;
  }
}