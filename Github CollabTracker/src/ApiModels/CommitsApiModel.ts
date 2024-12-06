import { UserApiModel } from "./UserApiModel";

export interface CommitsApiModel{
  nrOfContents: number;
  users: [UserApiModel];

}