import { IssueModel } from "./IssueModel";
import { RepoModel } from "./RepoModel";
import { UserModel } from "./UserModel";

interface GenericNumberObject<T> { [key: number]: T };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
export type RepoObject = GenericNumberObject<RepoModel>;
export type UserObject = GenericNumberObject<UserModel>;
