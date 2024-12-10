import { Scraper } from "../ApiScraper/Scraper";
import { UserModel } from "../Models";

export class DataManager {
  private scraper: Scraper;
  // private reader: Reader;
  // private writer: Writer;

  constructor(token: string) {
    this.scraper = new Scraper(token);
  }

  public async getUser(): Promise<UserModel> {
    return new UserModel(await this.scraper.scrapeUser());
  }
}