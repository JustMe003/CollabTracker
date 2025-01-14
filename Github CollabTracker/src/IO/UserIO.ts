import { UserModel } from "../Models/UserModel";
import { FileIO } from "../FileIO/FileIO";


export class UserIO extends FileIO {

  constructor(path: string) {
    super(path);
  }

  public async readUsers() : Promise<UserModel[]>  {
    const files = await this.getAllFilesInFolder();
    const res: UserModel[] = [];
    for (let i = 0; i < files.length; i++) {
      res.push(await this.readObject(files[i]) as UserModel);
    }
    console.log(res);
    return res;
  }

  public async readUser(userId: number): Promise<UserModel> {
    return await this.readObject(userId.toString() + FileIO.extension) as UserModel;
  }
}