import { RepoApiModel } from "../ApiModels/RepoApiModel";
import { UserApiModel } from "../ApiModels/UserApiModel";
import { UserModel } from "./UserModel"

export class RepoModel{
  private repoID: string;
  private html: string;
  private creator: UserModel;


  constructor(apiModel: RepoApiModel){
    this.repoID = apiModel.repoID;
    this.html = apiModel.html;
    this.creator = new UserModel(apiModel.creator);
  }

  public static createNew(repoID: string, html: string, creator: UserModel) {
    return new RepoModel({ repoID: repoID, html: html, creator: {name: creator.username, html_url: creator.html} as UserApiModel} as RepoApiModel);
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