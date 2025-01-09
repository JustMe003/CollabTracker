import { BranchApiModel } from "../ApiModels/BranchApiModel";
import { BranchModel, CommitsModel } from "../Models";

export class BranchModelConverter {
  public static convert(apiModel: BranchApiModel, commits: CommitsModel[] = []): BranchModel {
    return new BranchModel(apiModel.name, commits);
  }
}