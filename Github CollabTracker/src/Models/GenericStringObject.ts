import { BranchModel } from "./BranchModel";

interface GenericStringObject<T> { [key: string]: T };

export type BranchObject = GenericStringObject<BranchModel>;