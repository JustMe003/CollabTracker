import { FileStorage } from "../FileIO/FileStorage";
import { getNumberKeys, getStringKeys, RepoModel, RepoObject, UserModel, UserObject } from "../Models";
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
    getStringKeys(param).forEach((key: string) => {
      this.userIO.writeObject(param[key], key);
    })
  }

  public writeMetaData(param: MetaData) {
    this.metaDataIO.writeObject(param, "metaData");
  }

  public writeRepos(param: RepoObject) {
    getNumberKeys(param).forEach((key: number) => {
      this.repoIO.writeObject(param[key], key.toString());
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

  public getUser(name: string): Promise<UserModel> {
    return this.userIO.readUser(name);
  }
}
