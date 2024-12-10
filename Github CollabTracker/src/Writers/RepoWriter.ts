import { RepoModel } from "../Models/RepoModel";
import { Writer } from "./Writer";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

export class RepoWriter extends Writer {

  constructor(){
    super();
  }

  async readRepos() : Promise<RepoModel[]>  {
    const fileContents = await readTextFile(this.path, {
    baseDir: BaseDirectory.AppLocalData,
    });
    const data = JSON.parse(fileContents);
    if (Array.isArray(data)) {
      return data.map(item => RepoModel.createNew(item.name, item.html, item.creator));
    } else {
      return [RepoModel.createNew(data.name, data.html, data.creator )] // If it's a single object, wrap it in an array
    }
  }
}