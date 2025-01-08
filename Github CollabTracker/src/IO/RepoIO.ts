import { UserModel } from "../Models";
import { RepoModel } from "../Models/RepoModel";
import { FileWriter } from "../FileIO/FileWriter";
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

export class RepoIO extends FileWriter {

  constructor(path: string) {
    super(path);
  }

  async readRepos() : Promise<RepoModel[]>  {
    const fileContents = await readTextFile(this.path, {
    baseDir: BaseDirectory.AppLocalData,
    });
    const data = JSON.parse(fileContents);
    if (Array.isArray(data)) {
      return data.map(item => RepoModel.createNew(item.name, item.html, UserModel.createNew(item.creator.userName, item.creator.html)));
    } else {
      return [RepoModel.createNew(data.name, data.html, UserModel.createNew(data.creator.userName, data.creator.html) )] // If it's a single object, wrap it in an array
    }
  }
}