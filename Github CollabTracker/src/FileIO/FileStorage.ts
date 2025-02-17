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
    for (let i = 0; i < files.length; i++) {
      if(!await FileHandler.pathExists(files[i])) await FileHandler.createFolder(files[i]);
    }
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

  public static async getAllFileNamesInFolder(path: string): Promise<string[]> {
    return FileHandler.getAllFileNames(path);
  }
}

