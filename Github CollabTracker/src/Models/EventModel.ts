export class EventModel {
  private developerEvents: number;
  private administratorEvents: number;
  private commentatorEvents: number;

  constructor(developerEvents: number,  administratorEvents: number, commentatorEvents: number) {
    this.developerEvents = developerEvents;
    this.administratorEvents = administratorEvents;
    this.commentatorEvents = commentatorEvents;
  }


  public getAdminEntries() {
    return this.administratorEvents;
  }

  public getDeveloperEntries() {
    return this.developerEvents;
  }

  public getEventPlace() {
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