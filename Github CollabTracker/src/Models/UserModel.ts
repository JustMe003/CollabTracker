export class UserModel{
  private login: string;
  private username: string;
  private html: string;

  constructor(login: string, username: string, html: string){
    this.login = login;
    this.username = username;
    this.html = html;
  }

  public getLogin() {
    return this.login;
  }

  public getUserName() {
    return this.username;
  }

  public getHtml() {
    return this.html;
  }

  public static createNew(user: UserModel): UserModel {
    return new UserModel(user.login, user.username, user.html);
  }
}