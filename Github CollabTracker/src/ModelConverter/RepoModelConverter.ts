import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { BranchModel, IssueModel, RepoModel } from "../Models";

export class RepoModelConverter {
  public static convert(apiModel: RepoApiModel, branches: BranchModel[] = [], issues: IssueModel[] = []): RepoModel {
    return new RepoModel(apiModel.id, apiModel.html_url, apiModel.owner.id, apiModel.updated_at, branches, issues, [], []);
  }
}