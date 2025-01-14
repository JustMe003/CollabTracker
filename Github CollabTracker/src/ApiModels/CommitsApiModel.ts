import { CommitsExtraApiModel } from "./CommitExtraApiMode";
import { UserApiModel } from "./UserApiModel";

export interface CommitsApiModel{
  author: UserApiModel;
  sha: string;
  commit: CommitsExtraApiModel;

}