import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { BranchObject, IssueModel, RepoModel } from "../Models";

export class RepoModelConverter {
  public static convert(apiModel: RepoApiModel, branches: BranchObject = {}, issues: Map<number, IssueModel> = new Map(), pullReqs: Map<number, IssueModel> = new Map()): RepoModel {
    return new RepoModel(apiModel.id, apiModel.name, apiModel.html_url, apiModel.owner.id, apiModel.updated_at, branches, issues, pullReqs, []);
  }
}