import { FileHandler } from "./FileHandler";

export class FileStorage {
  private static StorageFolderName = "Storage";

  public async init() {
    if (!await FileHandler.pathExists(FileStorage.StorageFolderName)) {
      FileHandler.createFolder(FileStorage.StorageFolderName);
    }
  }

  public async initUserStorage(name: string) {
    const path = FileStorage.StorageFolderName + "\\" + name;
    if (!await FileHandler.pathExists(path)) {
      FileHandler.createFolder(path);
    }
    if (!await FileHandler.pathExists(path + "\\repos.json")) FileHandler.createFile(path + "\\repos.json");
    if (!await FileHandler.pathExists(path + "\\users.json")) FileHandler.createFile(path + "\\users.json");
  }
}

