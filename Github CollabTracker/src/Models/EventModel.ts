export class EventModel {
  private id: number;
  private participant: number;
  private type: string;
  private date: Date;
  private commit: string | null;
  private issue: string | null;
  private mergeRequest: string | null;

  constructor(id: number, participant: number, type: string,  date: Date, commit: string | null, issue: string | null, mergeRequest: string | null) {
    this.id = id;
    this.participant = participant;
    this.type = type;
    this.date = date;
    this.commit = commit;
    this.issue = issue;
    this.mergeRequest = mergeRequest;
  }

  public getID() {
    return this.id;
  }

  public getParticipant() {
    return this.participant;
  }

  public getType() {
    return this.type;
  }

  public getDate() {
    return this.date;
  }

  public getCommit() {
    return this.commit;
  }

  public getIssue() {
    return this.issue;
  }

  public getMergeRequest() {
    return this.mergeRequest;
  }

}