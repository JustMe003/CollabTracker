import { RepoModel } from "../Models/RepoModel";
import { FileIO } from "../FileIO/FileIO";

export class RepoIO extends FileIO {

  constructor(path: string) {
    super(path);
  }

  public async readRepos(): Promise<RepoModel[]>  {
    const files = await this.getAllFilesInFolder();
    const res: RepoModel[] = [];
    for (let i = 0; i < files.length; i++) {
      res.push(RepoModel.createNew(await this.readObject(files[i]) as RepoModel));
    }
    return res;
  }

  public async readRepo(repoID: number): Promise<RepoModel> {
    return RepoModel.createNew(await this.readObject(repoID.toString() + FileIO.extension) as RepoModel);
  }
}