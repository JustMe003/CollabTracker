import { CommitsApiModel } from "../ApiModels";
import { BranchApiModel } from "../ApiModels/BranchApiModel";
import { BranchModel, CommitsModel } from "../Models";

export class BranchModelConverter {
  public static convert(apiModel: BranchApiModel, last_updated: CommitsApiModel, commits: CommitsModel[] = []): BranchModel {
    return new BranchModel(apiModel.name, last_updated.commit.author.date, commits);
  }
}