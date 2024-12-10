import * as fs from "@tauri-apps/plugin-fs";

export abstract class Writer {
  protected path: string = "";


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
}
