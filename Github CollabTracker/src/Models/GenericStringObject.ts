import { BranchModel } from "./BranchModel";

interface GenericStringObject<T> { [key: string]: T | null | undefined };

export type BranchObject = GenericStringObject<BranchModel>;