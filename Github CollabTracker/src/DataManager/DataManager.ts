import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel, UserModel } from "../Models";

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

  public async getRepos(): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    console.log(res);
    const l: RepoModel[] = [];
    res.forEach((v) => {
      l.push(new RepoModel(v));
    });
    return l;
  }
}