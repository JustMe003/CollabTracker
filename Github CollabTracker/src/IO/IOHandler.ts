import { FileStorage } from "../FileIO/FileStorage";
import { RepoModel } from "../Models";
import { RepoIO } from "./RepoIO";
import { UserIO } from "./UserIO";

export class IOHandler {
  private repoIO: RepoIO;
  private userIO: UserIO;
  private reposPath: string;
  private usersPath: string;

  constructor(storage: FileStorage) {
    this.reposPath = this.getFolderPath(storage, "repos");
    this.usersPath = this.getFolderPath(storage, "users");
    this.repoIO = new RepoIO(this.reposPath);
    this.userIO = new UserIO(this.usersPath);
  }

  private getFolderPath(storage: FileStorage, name: string): string {
    return storage.getStoragePath() + FileStorage.getDelimiter() + name + FileStorage.getExtension();
  }
  
  public async init(storage: FileStorage) {
    await storage.init([
      this.reposPath,
      this.usersPath
    ]);
  }

  public writeUser(param: object) {
    this.userIO.writeObjects([param]);
  }

  public writeRepos(param: object[]) {
    this.repoIO.writeObjects(param);
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.repoIO.readRepos();
  }

}
