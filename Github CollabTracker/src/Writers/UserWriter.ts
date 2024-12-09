import { UserModel } from "../Models/UserModel";
import { Writer } from "./Writer";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';


export class UserWriter extends Writer {

  constructor(){
    super();
  }

  async readUsers() : Promise<UserModel[]>  {
    const fileContents = await readTextFile(this.path, {
    baseDir: BaseDirectory.LocalData,
    });
    const data = JSON.parse(fileContents);
    if (Array.isArray(data)) {
      return data as UserModel[];
    } else {
      return [data as UserModel]; 
    }
  }
}