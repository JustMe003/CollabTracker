import { EventModel } from "./EventModel";

export class RepoEventModel {
  private branchEvents: EventModel[] | undefined | null;  
  private issueEvents: EventModel[] | undefined | null;
  private mergeRequestEvents: EventModel[] | undefined | null;

  constructor(branchEvents: EventModel[] = [], issueEvents: EventModel[] = [], mergeRequestEvents: EventModel[] = []) {
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


  public setBranchEvents(events: EventModel[]) {
    this.branchEvents = events;
  }

  public setMergeRequests(events: EventModel[]) {
    this.mergeRequestEvents = events;
  }

  public setIssueEvents(events: EventModel[]) {
    this.issueEvents = events;
  }
}