import { FileHandler } from "./FileHandler";

export class FileStorage {
  private static Delimiter = "\\";
  private static Extension = ".json";
  private static StorageFolder = "Storage"
  private storageFolderName: string;

  constructor(folder: string) {
    this.storageFolderName = FileStorage.StorageFolder + FileStorage.Delimiter + folder;
  }

  public async init(files: Array<string>) {
    if (!await FileHandler.pathExists(FileStorage.StorageFolder)) 
      await FileHandler.createFolder(FileStorage.StorageFolder);
    if (!await FileHandler.pathExists(this.storageFolderName)) 
      await FileHandler.createFolder(this.storageFolderName);
    files.forEach((f) => {
      FileHandler.pathExists(f).then((b) => {
        if (!b) FileHandler.createFolder(f);
      })
    });
  }

  public getStoragePath(): string {
    return this.storageFolderName;
  }

  public static getDelimiter(): string {
    return FileStorage.Delimiter;
  }

  public static getExtension(): string {
    return FileStorage.Extension;
  }
}

