import { CommitsModel } from "./CommitsModel";

export class BranchModel {
  private name: string;
  private lastUpdated: Date;
  private commits: CommitsModel[];
  
  constructor(name: string, lastUpdated: Date, commits: CommitsModel[]){
    this.name = name;
    this.lastUpdated = lastUpdated;
    this.commits = commits
  }

  public getName() {
    return this.name;
  }

  public getLastUpdated() {
    return this.lastUpdated;
  }

  public getCommits() {
    return this.commits;
  }

  public static createNew(mod: BranchModel): BranchModel {
    return new BranchModel(mod.name, mod.lastUpdated, mod.commits);
  }
}