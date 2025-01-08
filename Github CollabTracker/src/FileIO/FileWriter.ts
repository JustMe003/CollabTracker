import * as fs from "@tauri-apps/plugin-fs";
import { FileHandler } from "./FileHandler";

export abstract class FileWriter {
  protected path: string;

  constructor(path: string) {
    this.path = path;
    FileHandler.pathExists(this.path).then((b) => {
      if(!b) FileHandler.createFile(this.path);
    }, (reason) => {
      throw new Error(reason.toString());
    });
  }

  async writeObject(object: object) {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: fs.BaseDirectory.AppLocalData,
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = {};
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(this.path, JSON.stringify(jsonObject), {
        baseDir: fs.BaseDirectory.AppLocalData,
      })
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async writeObjects(object: object[]) {
    try {
      const fileContents = await fs.readTextFile(this.path, {
        baseDir: fs.BaseDirectory.AppLocalData,
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = [];
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(this.path, JSON.stringify(jsonObject), {
        baseDir: fs.BaseDirectory.AppLocalData,
      })
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async readObjects() {
    
  }
}
