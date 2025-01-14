import * as fs from "@tauri-apps/plugin-fs";
import { FileStorage } from "./FileStorage";
import { FileHandler } from "./FileHandler";

export abstract class FileIO {
  protected path: string;
  private static baseDir: fs.BaseDirectory = fs.BaseDirectory.AppLocalData;
  private static extension: string = FileStorage.getExtension();
  private static delimiter: string = FileStorage.getDelimiter();

  constructor(path: string) {
    this.path = path;
  }

  getFilePath(file: string): string {
    return this.path + FileIO.delimiter + file + FileIO.extension;
  }

  async writeObject(object: object, file: string) {
    try {
      const filePath = this.getFilePath(file);
      if (!await FileHandler.pathExists(filePath))
        await FileHandler.createFile(filePath);
      const fileContents = await fs.readTextFile(filePath, {
        baseDir: FileIO.baseDir
      });
      let jsonObject;
      if (fileContents) {
        jsonObject = JSON.parse(fileContents);
      } else {
        jsonObject = {};
      }
      Object.assign(jsonObject, object);
      await fs.writeTextFile(filePath, JSON.stringify(jsonObject, null, 1), {
        baseDir: FileIO.baseDir
      })
    } catch (error) {
      console.error("Error updating file:", error);
    }
  }

  async readObject(file: string): Promise<Object | undefined> {
    try {
      const filePath = this.getFilePath(file);
      if (await FileHandler.pathExists(filePath)) {
        const fileContents = await fs.readTextFile(filePath, {
          baseDir: FileIO.baseDir
        });
        if (fileContents) {
          return JSON.parse(fileContents);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllFilesInFolder(): Promise<string[]> {
    const res = await FileStorage.getAllFileNamesInFolder(this.path);
    for (let i = 0; i < res.length; i++) {
      let name = res[i];
      if (name.endsWith(FileIO.extension)) res[i] = name.substring(0, name.length - FileIO.extension.length);
    }
    return res;
  }
}
