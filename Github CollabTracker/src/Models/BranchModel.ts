import { CommitsModel } from "./CommitsModel";

export class BranchModel {
  private name: string;
  private commits: CommitsModel[];
  
  constructor(name: string, commits: CommitsModel[]){
    this.name = name;
    this.commits = commits
  }

  public getName() {
    return this.name;
  }

  public getCommits() {
    return this.commits;
  }
}