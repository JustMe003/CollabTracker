import { FileIO } from "../FileIO/FileIO";
import { MetaData } from "../Models/MetaData";

export class metaDataIO extends FileIO {

  constructor(path: string) {
    console.log(path);
    super(path);
  }

  public async readMetaData(): Promise<MetaData> {
    const read = await this.readObject("metaData") as MetaData;
    if (read == undefined)
      return new MetaData(new Date("2006-01-01T00:00:00"))
    else 
      return MetaData.createNew(read);
    
  }
}