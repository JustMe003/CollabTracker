import * as fs from "@tauri-apps/plugin-fs";

export abstract class Writer {
  protected path: string = "";

  // Initialize the Writer by checking and creating the folder/file
  public async init(path:string) {
    this.path = path
    const exists = await this.checkFile();
    if (!exists) {
      await this.createFile();
    }
  }

  // Check if the file/folder exists
  protected async checkFile(): Promise<boolean> {
    return await fs.exists(this.path, {baseDir: fs.BaseDirectory.AppLocalData});
  }

  // Create the folder/file if it doesn't exist
  protected async createFile() {
    try {
      await fs.create(this.path, {
        baseDir: fs.BaseDirectory.AppLocalData,
      });
      console.log(`File created at: ${this.path}`);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }

  async writeObject(object: object) {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: fs.BaseDirectory.LocalData,
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = {};
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(this.path, JSON.stringify(jsonObject), {
        baseDir: fs.BaseDirectory.LocalData,
      })
      console.log("File updated successfully!");
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }
}
