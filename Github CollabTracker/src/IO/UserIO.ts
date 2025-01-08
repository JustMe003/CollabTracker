import { UserModel } from "../Models/UserModel";
import { FileIO } from "../FileIO/FileIO";


export class UserIO extends FileIO {

  constructor(path: string) {
    super(path);
  }

  async readUsers() : Promise<UserModel[]>  {
    const data = await this.readObjects();
    if (data) {
      return data as UserModel[];
    } else {
      return [];
    }
  }
}