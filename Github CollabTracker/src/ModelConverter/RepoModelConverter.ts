import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { BranchModel, IssueModel, RepoModel } from "../Models";

export class RepoModelConverter {
  public static convert(apiModel: RepoApiModel, branches: Map<string, BranchModel>, issues: Map<number, IssueModel>, pullReqs: Map<number, IssueModel>): RepoModel {
    return new RepoModel(apiModel.id, apiModel.html_url, apiModel.owner.id, apiModel.updated_at, branches, issues, pullReqs, []);
  }
}