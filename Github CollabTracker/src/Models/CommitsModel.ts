import { User } from "./UserModel";

export class CommitsModel{
  public nrOfContents: number;
  public users: [User];

  constructor(users: [User], nrOfContents: number){
    this.nrOfContents = nrOfContents;
    this.users = users;
  }
}