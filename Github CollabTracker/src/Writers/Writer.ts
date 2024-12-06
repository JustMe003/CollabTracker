import * as fs from "@tauri-apps/plugin-fs";
import { appDataDir } from "@tauri-apps/api/path";

export abstract class Writer {
  protected path: string = "";

  // Initialize the Writer by checking and creating the folder/file
  public async init(path:string) {
    const appDir = await this.getAppDir();
    this.path = appDir + '/' + path;
    const exists = await this.checkFile();
    if (!exists) {
      await this.createFile();
    }
  }

  // Get the application data directory path
  private async getAppDir(): Promise<string> {
    return await appDataDir();
  }

  // Check if the file/folder exists
  protected async checkFile(): Promise<boolean> {
    return await fs.exists(this.path);
  }

  // Create the folder/file if it doesn't exist
  protected async createFile() {
    try {
      // If it's a directory you're creating:
      await fs.create(this.path);
      console.log(`File created at: ${this.path}`);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }
}
