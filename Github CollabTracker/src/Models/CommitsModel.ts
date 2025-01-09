export class CommitsModel {
  private sha: string;
  private date: Date;
  private author: number;

  constructor(sha: string, date: Date, author: number){
    this.sha = sha;
    this.date = date;
    this.author = author;
  }

  public getSHA() {
    return this.sha;
  }

  public getDate() {
    return this.date;
  }

  public getAuthor() {
    return this.author;
  }

}