import * as fs from "@tauri-apps/plugin-fs"
import { RepoWriter } from "./RepoWriter";
import { UserWriter } from "./UserWriter";
export class WriteHandler{
  private  repoWriter: RepoWriter;
  private  userWriter: UserWriter;
  private  path:string = "../../Storage";

  constructor(){
    const exists = this.checkFolder;
    if(!exists){
      this.createFolder()
    }
    this.repoWriter = new RepoWriter();
    this.userWriter = new UserWriter();
  }

  private async checkFolder(){
    return await fs.exists(this.path);
  }

  private async createFolder() {
    try {
      await fs.mkdir(this.path);
      console.log(`Folder created at: ${this.path}`);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }
}