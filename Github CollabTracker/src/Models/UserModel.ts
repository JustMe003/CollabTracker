import { UserApiModel } from "../ApiModels/UserApiModel";

export class UserModel{
  private username: string;
  private html: string;

  constructor(apiModel: UserApiModel){
    this.username = apiModel.name;
    this.html = apiModel.html_url;
  }

  public static createNew(name: string, html: string) {
    return new UserModel({ name: name, html_url: html} as UserApiModel);
  }

  public getUserName() {
    return this.username;
  }
}