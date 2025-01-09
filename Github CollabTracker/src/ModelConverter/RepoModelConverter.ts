import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { RepoModel } from "../Models";

export class RepoModelConverter {
  public static convert(apiModel: RepoApiModel): RepoModel {
    return new RepoModel(apiModel.id, apiModel.html_url, apiModel.owner.id, apiModel.updated_at);
  }
}