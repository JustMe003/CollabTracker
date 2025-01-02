import { RepoWriter } from "./RepoWriter";
import { UserWriter } from "./UserWriter";
import { RepoModel, UserModel } from "../Models";

export class WriteHandler {
  private repoWriter: RepoWriter;
  private userWriter: UserWriter;

  constructor() {
    this.repoWriter = new RepoWriter();
    this.userWriter = new UserWriter();
  }

  public writeUser(param: object) {
    this.userWriter.writeObjects([param]);
  }

  public async getUser(): Promise<UserModel> {
    return (await this.userWriter.readUsers())[0];
  }

  public writeRepos(param: object[]) {
    this.repoWriter.writeObjects(param);
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.repoWriter.readRepos();
  }
}
