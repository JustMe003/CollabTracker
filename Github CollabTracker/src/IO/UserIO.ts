import { UserModel } from "../Models/UserModel";
import { FileWriter } from "../FileIO/FileWriter";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';


export class UserIO extends FileWriter {

  constructor(path: string) {
    super(path);
  }

  async readUsers() : Promise<UserModel[]>  {
    const fileContents = await readTextFile(this.path, {
      baseDir: BaseDirectory.AppLocalData,
    });
    const data = JSON.parse(fileContents);
    if (Array.isArray(data)) {
      return data.map(item => UserModel.createNew(item.username, item.html));
    } else {
      return [UserModel.createNew(data.username, data.html)]; 
    }
  }
}