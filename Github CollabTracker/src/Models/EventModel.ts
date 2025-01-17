export class EventModel {
  private participant: string;
  private type: string;
  private date: Date | undefined;
  private eventPlaceID: number;

  constructor(participant: string, type: string,  date: Date | undefined, eventPlaceID: number) {
    this.participant = participant;
    this.type = type;
    this.date = date;
    this.eventPlaceID = eventPlaceID
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

  public getEventPlace() {
    return this.eventPlaceID;
  }

}