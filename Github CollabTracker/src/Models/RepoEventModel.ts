export class RepoEventModel {
  private branchEvents: number[];
  private issueEvents: number[];
  private mergeRequestEvents: number[];

  constructor(branchEvents: number[], issueEvents: number[], mergeRequestEvents: number[]) {
    this.branchEvents = branchEvents;
    this.issueEvents = issueEvents;
    this.mergeRequestEvents = mergeRequestEvents;
  }

  public getBranchEvents() {
    return this.branchEvents;
  }

  public getIssueEvents() {
    return this.issueEvents;
  }

  public getMergeRequestEvents() {
    return this.mergeRequestEvents;
  }
}