export class EventModel {
  private participant: string;
  private developerEvents: number;
  private administratorEvents: number;
  private commentatorEvents: number;

  constructor(participant: string, developerEvents: number,  administratorEvents: number, commentatorEvents: number) {
    this.participant = participant;
    this.developerEvents = developerEvents;
    this.administratorEvents = administratorEvents;
    this.commentatorEvents = commentatorEvents;
    
  }

  public getParticipant() {
    return this.participant;
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

  public static createNew(mod: EventModel): EventModel { 
    return new EventModel(mod.participant, mod.developerEvents, mod.administratorEvents, mod.commentatorEvents);
  }

}