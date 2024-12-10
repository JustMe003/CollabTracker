import * as fs from "@tauri-apps/plugin-fs";


export abstract class FileHandler {

  /**
   * Checks whether a folder or file exists on the local app data and given path
   * @param path The path to the folder or file from the local app data
   * @returns A boolean promise, true when the folder or file exists, false otherwise
   */
  public static async pathExists(path: string): Promise<boolean> {
    return await fs.exists(path, {baseDir: fs.BaseDirectory.AppLocalData});
  }

  /**
   * Creates a folder on the local app data storage and the given path
   * @param path The path to the folder from the local app data
   */
  public static async createFolder(path: string) {
    try {
      await fs.mkdir(path, { baseDir: fs.BaseDirectory.AppLocalData });
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  }

  /**
   * Creates a file on the local app data storage and the given path
   * @param path The path to the file from the local app data 
   */
  public static async createFile(path: string) {
    try {
      await fs.create(path, { baseDir: fs.BaseDirectory.AppLocalData });
    } catch (error) {
      console.error("Error creating file:", error);
    }
  }
}