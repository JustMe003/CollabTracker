export class UserModel{
  private id: number;
  private login: string;
  private username: string;
  private html: string;

  constructor(id: number, login: string, username: string, html: string){
    this.id = id;
    this.login = login;
    this.username = username;
    this.html = html;
  }

  public getLogin() {
    return this.login;
  }

  public getID() {
    return this.id;
  }

  public getUserName() {
    return this.username;
  }

  public getHtml() {
    return this.html;
  }
}