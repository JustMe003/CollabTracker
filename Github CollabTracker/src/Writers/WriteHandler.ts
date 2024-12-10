import * as fs from "@tauri-apps/plugin-fs";
import { RepoWriter } from "./RepoWriter";
import { UserWriter } from "./UserWriter";

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
    console.log(exists);
    if (!exists) {
      await this.createFolder(storage);
    }
    const subDirPath = storage + '\\' + this.userName;
    const userExists = await this.checkFolder(subDirPath)
    if (!userExists) {
      await this.createFolder(subDirPath);
    }
    this.repoWriter.init(subDirPath + "\\repos.json");
    this.userWriter.init(subDirPath + "\\users.json");
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
    this.userWriter.writeObject(param);
  }
}
