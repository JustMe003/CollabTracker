import { IssueModel } from "./IssueModel";
import { RepoModel } from "./RepoModel";

interface GenericNumberObject<T> { [key: number]: T };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
export type RepoObject = GenericNumberObject<RepoModel>;

export function getNumberKeys<T, U extends GenericNumberObject<T>>(obj: U): number[] {
  const list: number[] = [];
  Object.keys(obj).forEach(e => list.push(parseInt(e)));
  return list;
}