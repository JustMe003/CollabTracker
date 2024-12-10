import { UserModel } from "../Models/UserModel";
import { Writer } from "./Writer";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';


export class UserWriter extends Writer {

  constructor(){
    super();
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