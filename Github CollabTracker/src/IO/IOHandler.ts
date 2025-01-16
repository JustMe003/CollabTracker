import { FileStorage } from "../FileIO/FileStorage";
import { getNumberObjectList, getStringObjectList, RepoModel, RepoObject, UserModel, UserObject } from "../Models";
import { RepoIO } from "./RepoIO";
import {metaDataIO} from "./metaDataIO"
import { UserIO } from "./UserIO";
import { MetaData } from "../Models/MetaData";

export class IOHandler {
  private repoIO: RepoIO;
  private userIO: UserIO;
  private metaDataIO: metaDataIO;
  private metaDataPath: string;
  private reposPath: string;
  private usersPath: string;

  constructor(storage: FileStorage) {
    this.reposPath = this.getFolderPath(storage, "repos");
    this.usersPath = this.getFolderPath(storage, "users");
    this.metaDataPath = storage.getStoragePath();
    console.log(this.metaDataPath)
    this.metaDataIO = new metaDataIO(this.metaDataPath)
    this.repoIO = new RepoIO(this.reposPath);
    this.userIO = new UserIO(this.usersPath);
  }

  private getFolderPath(storage: FileStorage, name: string): string {
    return storage.getStoragePath() + FileStorage.getDelimiter() + name;
  }
  
  public async init(storage: FileStorage) {
    await storage.init([
      this.reposPath,
      this.usersPath
    ]);
  }

  public writeUser(param: UserModel) {
    this.userIO.writeObject(param, param.getLogin());
  }

  public writeUsers(param: UserObject) {
    getStringObjectList<UserModel, UserObject>(param).forEach((pair: [string, UserModel]) => {
      this.userIO.writeObject(pair[1], pair[0]);
    })
  }

  public writeMetaData(param: MetaData) {
    this.metaDataIO.writeObject(param, "metaData");
  }

  public writeRepos(param: RepoObject) {
    getNumberObjectList<RepoModel, RepoObject>(param).forEach((repo: [number, RepoModel]) => {
      this.repoIO.writeObject(repo[1], repo[0].toString());
    });
  }

  public writeRepo(repo: RepoModel) {
    this.repoIO.writeObject(repo, repo.getRepoID().toString());
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.repoIO.readRepos();
  }

  public getUsers(): Promise<UserModel[]> {
    return this.userIO.readUsers();
  }

  public getMetaData() : Promise<MetaData> {
    return this.metaDataIO.readMetaData();
  }
}
