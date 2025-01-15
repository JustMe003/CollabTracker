import { IssueModel } from "./IssueModel";
import { RepoModel } from "./RepoModel";

interface GenericNumberObject<T> { [key: number]: T };

export type IssueObject = GenericNumberObject<IssueModel>;
export type PullReqObject = GenericNumberObject<IssueModel>;
export type RepoObject = GenericNumberObject<RepoModel>;

export function getNumberObjectList<T, U extends GenericNumberObject<T>>(obj: U): [number, T][] {
  const list: [number, T][] = [];
  Object.entries(obj).forEach((pair) => {
    list.push([parseInt(pair[0]), pair[1]]);
  });
  return list;
}