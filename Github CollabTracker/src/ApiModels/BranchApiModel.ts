import { URLcommitModel } from "./URLcommitModel";

export interface BranchApiModel {
  name: string;  
  commit: URLcommitModel;
}