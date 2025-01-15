import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel";

interface GenericStringObject<T> { [key: string]: T };

export type BranchObject = GenericStringObject<BranchModel>;
export type UserObject = GenericStringObject<UserModel>;
