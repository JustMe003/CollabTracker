import { CommitsApiModel } from "../ApiModels";
import { CommitsModel } from "../Models";

export class CommitModelConverter {
  public static convert(apiModel: CommitsApiModel) {
    let name;
    if (apiModel.author) name = apiModel.author.login;
    else name = apiModel.commit.author.name;
    return new CommitsModel(apiModel.sha, apiModel.commit.author.date, name);
  }
}