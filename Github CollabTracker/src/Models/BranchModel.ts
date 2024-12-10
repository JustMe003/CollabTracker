import { BranchApiModel } from "../ApiModels/BranchApiModel";
import { UserApiModel } from "../ApiModels/UserApiModel";
import { UserModel } from "./UserModel";

export class BranchModel{
  public creator: UserModel;
  public sha: string;
  
  constructor(apiModel: BranchApiModel){
    this.creator = new UserModel(apiModel.creator);
    this.sha = apiModel.sha;
  }

  public static createNew(creator: UserModel, sha: string){
    return new BranchModel({creator: {name: creator.getUserName(), html_url:creator.getHtml()} as UserApiModel, sha:sha} as BranchApiModel);

  }
}