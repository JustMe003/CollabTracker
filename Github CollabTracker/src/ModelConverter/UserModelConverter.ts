import { UserApiModel } from "../ApiModels/UserApiModel";
import { UserModel } from "../Models";

export class UserModelConverter {
  public static convert(apiModel: UserApiModel): UserModel {
    return new UserModel(apiModel.id, apiModel.login, apiModel.username, apiModel.html_url);
  }
}