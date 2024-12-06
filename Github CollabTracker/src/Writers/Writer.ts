import * as fs from "@tauri-apps/plugin-fs"
export abstract class Writer{
  protected  path:string;

  constructor(path:string){
    this.path = path;
    const exists = this.checkFile;
    if(!exists){
      this.createFolder()
    };
  }

  protected async checkFile(){
    return await fs.exists(this.path);
  }

  protected async createFolder() {
    try {
      await fs.create(this.path);
      console.log(`File created at: ${this.path}`);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }
}