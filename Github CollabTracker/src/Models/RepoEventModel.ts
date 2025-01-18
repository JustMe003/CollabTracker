import { EventModel } from "./EventModel";

export class RepoEventModel {
  private branchEvents: EventModel[];  
  private issueEvents: EventModel[];
  private mergeRequestEvents: EventModel[];

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

  public static createNew(mod: RepoEventModel): RepoEventModel {
    const branches: EventModel[] = [];
    mod.branchEvents.forEach( event => branches.push(EventModel.createNew(event)))
    const issues: EventModel[] = [];
    mod.branchEvents.forEach( event => issues.push(EventModel.createNew(event)))
    const mergeReqs: EventModel[] = [];
    mod.branchEvents.forEach( event => mergeReqs.push(EventModel.createNew(event)))
    return new RepoEventModel(branches, issues, mergeReqs);
  }
}