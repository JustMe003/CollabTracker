import { CommitsApiModel } from "../ApiModels";
import { CommitsModel } from "../Models";

export class CommitModelConverter {
  public static convert(apiModel: CommitsApiModel) {
    return new CommitsModel(apiModel.sha, apiModel.commit.author.date, apiModel.commit.author.name);
  }
}