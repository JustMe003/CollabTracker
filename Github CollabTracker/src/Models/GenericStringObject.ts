import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel";

interface GenericStringObject<T> { [key: string]: T };

export type BranchObject = GenericStringObject<BranchModel>;
export type UserObject = GenericStringObject<UserModel>;
export type CommentersObject = GenericStringObject<number>;

export function getStringKeys<T, U extends GenericStringObject<T>>(obj: U): string[] {
  return Object.keys(obj);
}