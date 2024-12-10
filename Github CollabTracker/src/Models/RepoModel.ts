import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel"

export class RepoModel{
  private repoID: string;
  private html: string;
  private creator: UserModel;
  private branches: BranchModel[] = []


  constructor(repoID: string, html: string, creator: UserModel){
    this.repoID = repoID;
    this.html = html;
    this.creator = creator;
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

  public getBranches() {
    return this.branches;
  }

  public setBranches(branches: BranchModel[]) {
    this.branches = branches;
  }
}