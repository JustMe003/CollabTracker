import { UserApiModel } from "../ApiModels/UserApiModel";

export class UserModel{
  public username: string;
  public html: string;

  constructor(apiModel: UserApiModel){
    this.username = apiModel.name;
    this.html = apiModel.html_url;
  }

  public static createNew(name: string, html: string) {
    return new UserModel({ name: name, html_url: html} as UserApiModel);
  }
}