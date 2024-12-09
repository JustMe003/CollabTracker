import { RepoModel } from "../Models/RepoModel";
import { Writer } from "./Writer";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

export class RepoWriter extends Writer {

  constructor(){
    super();
  }

  async readRepos() : Promise<RepoModel[]>  {
    const fileContents = await readTextFile(this.path, {
    baseDir: BaseDirectory.LocalData,
    });
    const data = JSON.parse(fileContents);
    if (Array.isArray(data)) {
      return data as RepoModel[]; // If it's already an array, cast it
    } else {
      return [data as RepoModel]; // If it's a single object, wrap it in an array
    }
  }
}