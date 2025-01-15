import { FileIO } from "../FileIO/FileIO";
import { MetaData } from "../Models/MetaData";

export class metaDataIO extends FileIO {

  constructor(path: string) {
    console.log(path);
    super(path);
  }

  public async readMetaData(): Promise<MetaData> {
    return MetaData.createNew(await this.readObject("metaData" + FileIO.extension) as MetaData);
  }
}