import * as fs from "@tauri-apps/plugin-fs";
import { RepoWriter } from "./RepoWriter";
import { UserWriter } from "./UserWriter";

export class WriteHandler {
  private repoWriter: RepoWriter;
  private userWriter: UserWriter;

  constructor() {
    this.repoWriter = new RepoWriter();
    this.userWriter = new UserWriter();
  }

  // Initialize the WriteHandler by checking and creating the folder
  public async init() {
    const exists = await this.checkFolder();    
    console.log(exists);
    if (!exists) {
      await this.createFolder();
      }
    /*
      this.repoWriter.init("Storage/repos.json");
    this.userWriter.init("Storage/users.json")
    */
  }
  // Check if the folder exists
  private async checkFolder(): Promise<boolean> {
    return await fs.exists('Storage', {baseDir: fs.BaseDirectory.AppLocalData,});
  }

  // Create the folder if it doesn't exist
  private async createFolder() {
    try {
      await fs.mkdir('Storage', {baseDir: fs.BaseDirectory.AppLocalData,});
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }
}
