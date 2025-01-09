export class BranchModel {
  private name: string;
  private commits: string[];
  
  constructor(name: string, commits: string[]){
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