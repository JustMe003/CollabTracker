import { RepoModel } from "../Models/RepoModel";
import { FileIO } from "../FileIO/FileIO";

export class RepoIO extends FileIO {

  constructor(path: string) {
    super(path);
  }

  async readRepos() : Promise<RepoModel[]>  {
    const data = await this.readObjects();
    if (data) {
      return data as RepoModel[];
    } else {
      return [];
    }
  }
}