import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { UserApiModel } from "../ApiModels/UserApiModel";
import { UserModel } from "./UserModel"

export class RepoModel{
  private repoID: string;
  private html: string;
  private creator: UserModel;


  constructor(apiModel: RepoApiModel){
    this.repoID = apiModel.id;
    this.html = apiModel.html_url;
    this.creator = new UserModel(apiModel.owner);
  }

  public static createNew(repoID: string, html: string, creator: UserModel) {
    return new RepoModel({ id: repoID, html_url: html, owner: {login: creator.getUserName(), html_url: creator.getHtml()} as UserApiModel} as RepoApiModel);
  }

  public getRepoID() {
    return this.repoID;
  }

  public getHtml() {
    return this.html;
  }

  public getCreator() {
    return this.creator;
  }

}