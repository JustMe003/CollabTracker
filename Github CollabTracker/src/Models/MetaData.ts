export class MetaData {
  private lastUpdated: Date;


  constructor(lastUpdated: Date) {
    this.lastUpdated = lastUpdated;
  }

  public getLastUpdated() {
    return this.lastUpdated;
  }

  public resetLastUpdated() {
    this.lastUpdated = new Date();
  }


  public static createNew(lastUpdated: MetaData): MetaData {
    return new MetaData(lastUpdated.lastUpdated);
  }
}