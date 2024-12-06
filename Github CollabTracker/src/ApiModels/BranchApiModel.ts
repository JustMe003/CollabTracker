import { UserApiModel } from "./UserApiModel";

export interface BranchApiModel{
  creator: UserApiModel;
  sha: string;
  
}