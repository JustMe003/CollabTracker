import { UserModel } from "./UserModel";

export class CommitsModel{
  public nrOfContents: number;
  public users: [UserModel];

  constructor(users: [UserModel], nrOfContents: number){
    this.nrOfContents = nrOfContents;
    this.users = users;
  }
}