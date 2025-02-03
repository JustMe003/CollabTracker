import { BranchModel } from "./BranchModel";
import { EventModel } from "./EventModel";
import { UserModel } from "./UserModel";

interface GenericStringObject<T> { [key: string]: T };

export type BranchObject = GenericStringObject<BranchModel>;
export type UserObject = GenericStringObject<UserModel>;
export type CommentersObject = GenericStringObject<number>;
export type RepoCollaborations = GenericStringObject<UserCollaborations>
export type UserCollaborations = GenericStringObject<EventModel>

export function getStringKeys<T, U extends GenericStringObject<T>>(obj: U): string[] {
  return Object.keys(obj);
}