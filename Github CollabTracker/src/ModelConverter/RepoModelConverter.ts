import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { BranchObject, IssueObject, RepoModel } from "../Models";
import { RepoCollaborations } from "../Models/GenericStringObject";

export class RepoModelConverter {
  public static convert(apiModel: RepoApiModel, branches: BranchObject = {}, issues: IssueObject = {}, pullReqs: IssueObject = {}, collaborations: RepoCollaborations = {}): RepoModel {
    return new RepoModel(apiModel.id, apiModel.name, apiModel.html_url, apiModel.owner.login, apiModel.default_branch, branches, issues, pullReqs, collaborations);
  }
}