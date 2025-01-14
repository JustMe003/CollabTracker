import { Scraper } from "../ApiScraper/Scraper";
import { DataManager } from "../DataManager/DataManager";
import { FileStorage } from "../FileIO/FileStorage";
import { IOHandler } from "../IO/IOHandler";
import { UserModelConverter } from "../ModelConverter";
import { UserModel } from "../Models";

export class Controller {
  private scraper: Scraper;

  constructor(token: string) {
    this.scraper = new Scraper(token);
  }

  public async getDataManager() {
    const us: UserModel = await this.updateUs();
    const storage = new FileStorage(us.getLogin());
    const handler = new IOHandler(storage);
    await handler.init(storage);
    return new DataManager(this.scraper, handler);
  }
  
  private async updateUs(): Promise<UserModel> {
    return UserModelConverter.convert(await this.scraper.scrapeUs());
  }
  
}