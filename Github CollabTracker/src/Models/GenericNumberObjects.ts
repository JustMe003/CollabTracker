import { IssueModel } from "./IssueModel";

interface GenericNumberObject<T> { [key: number]: T };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
