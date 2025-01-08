import { FileHandler } from "./FileHandler";

export class FileStorage {
  private static StorageFolderName = "Storage";

  public static async init() {
    if (!await FileHandler.pathExists(FileStorage.StorageFolderName)) {
      FileHandler.createFolder(FileStorage.StorageFolderName);
    }
  }

  public static getStoragePath() {
    return FileStorage.StorageFolderName;
  }
}

