import { IssueModel } from "./IssueModel";

interface GenericNumberObject<T> { [key: number]: T | null | undefined };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
