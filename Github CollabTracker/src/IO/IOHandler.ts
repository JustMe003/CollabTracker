import { FileStorage } from "../FileIO/FileStorage";
import { RepoModel } from "../Models";
import { RepoIO } from "./RepoIO";
import { UserIO } from "./UserIO";

const delimiter: string = "\\";
const extension: string = ".json";

export class IOHandler {
  private repoIO: RepoIO;
  private userIO: UserIO;
  private static path: string =  FileStorage.getStoragePath();
  private static reposPath: string = IOHandler.path + delimiter + "repos" + extension;
  private static usersPath: string = IOHandler.path + delimiter + "users" + extension;

  constructor() {
    FileStorage.init();
    this.repoIO = new RepoIO(IOHandler.reposPath);
    this.userIO = new UserIO(IOHandler.usersPath);
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
