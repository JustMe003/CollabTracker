export class UserModel{
  public username: string;
  public html: string;

  constructor(username: string, html: string){
    this.username = username;
    this.html = html;
  }
}