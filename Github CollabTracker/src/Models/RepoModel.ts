export class RepoModel{
  private repoID: string;
  private html: string;
  private creatorID: number;
  private updated_at: Date;


  constructor(repoID: string, html: string, creatorID: number, updated_at: Date){
    this.repoID = repoID;
    this.html = html;
    this.creatorID = creatorID;
    this.updated_at = updated_at;
  }
  

  public getRepoID() {
    return this.repoID;
  }

  public getHtml() {
    return this.html;
  }

  public getCreator() {
    return this.creatorID;
  }

  public getUpdatedAt() {
    return this.updated_at;
  }

}