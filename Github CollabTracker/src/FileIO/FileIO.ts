import * as fs from "@tauri-apps/plugin-fs";

export abstract class FileIO {
  protected path: string;
  private static baseDir: fs.BaseDirectory = fs.BaseDirectory.AppLocalData;

  constructor(path: string) {
    this.path = path;
  }

  async writeObject(object: object) {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: FileIO.baseDir
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = {};
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(this.path, JSON.stringify(jsonObject, null, 1), {
        baseDir: FileIO.baseDir
      })
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async writeObjects(object: object[]) {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: FileIO.baseDir
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = [];
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(this.path, JSON.stringify(jsonObject, null, 1), {
        baseDir: FileIO.baseDir
      })
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async readObjects(): Promise<Object[] | undefined> {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: FileIO.baseDir
      });
      if (fileContents) {
        return JSON.parse(fileContents);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
