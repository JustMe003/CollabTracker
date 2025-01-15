import { IssueModel } from "./IssueModel";
import { RepoModel } from "./RepoModel";

interface GenericNumberObject<T> { [key: number]: T };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
export type RepoObject = GenericNumberObject<RepoModel>;
