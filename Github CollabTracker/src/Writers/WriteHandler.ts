import * as fs from "@tauri-apps/plugin-fs";
import { RepoWriter } from "./RepoWriter";
import { UserWriter } from "./UserWriter";
import { RepoModel, UserModel } from "../Models";

export class WriteHandler {
  private repoWriter: RepoWriter;
  private userWriter: UserWriter;
  private userName: string;

  constructor(username: string) {
    this.repoWriter = new RepoWriter();
    this.userWriter = new UserWriter();
    this.userName = username;
  }

  // Initialize the WriteHandler by checking and creating the folder
  public async init() {
    const storage = 'Storage';
    const exists = await this.checkFolder(storage);
    if (!exists) {
      await this.createFolder(storage);
    }
    const subDirPath = storage + '\\' + this.userName;
    const userExists = await this.checkFolder(subDirPath)
    if (!userExists) {
      await this.createFolder(subDirPath);
    }
    await this.repoWriter.init(subDirPath + "\\repos.json");
    await this.userWriter.init(subDirPath + "\\users.json");
  }
  
  // Check if the folder exists
  private async checkFolder(name: string): Promise<boolean> {
    return await fs.exists(name, {baseDir: fs.BaseDirectory.AppLocalData});
  }

  // Create the folder if it doesn't exist
  private async createFolder(name: string) {
    try {
      await fs.mkdir(name, {baseDir: fs.BaseDirectory.AppLocalData});
    } catch (error) {
      console.error('Error creating folder:', error);
    }
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
