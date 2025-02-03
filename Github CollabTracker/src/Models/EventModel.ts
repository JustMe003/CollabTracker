export class EventModel {
  private developerEvents: number;
  private administratorEvents: number;
  private commentatorEvents: number;

  constructor(participant: string, type: string,  date: Date | undefined, eventPlaceID: number) {
    this.participant = participant;
    this.type = type;
    this.date = date;
    this.eventPlaceID = eventPlaceID;
  }


  public getAdminEntries() {
    return this.administratorEvents;
  }

  public getDeveloperEntries() {
    return this.developerEvents;
  }

  public getCommentatorEvents() {
    return this.commentatorEvents;
  }

  public incrementAdmin(value: number) {
    this.administratorEvents += value;
  }

  public incrementCommentator(value: number) {
    this.commentatorEvents += value;
  }

  public incrementDeveloper(value: number) {
    this.developerEvents += value;
  }

  public static createNew(mod: EventModel): EventModel { 
    return new EventModel(mod.developerEvents, mod.administratorEvents, mod.commentatorEvents);
  }

}