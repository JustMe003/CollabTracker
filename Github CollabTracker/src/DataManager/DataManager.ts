import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel, UserModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { UserModelConverter } from "../ModelConverter/UserModelConverter";
import { RepoModelConverter } from "../ModelConverter/RepoModelConverter";

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;

  constructor(token: string, handler: IOHandler) {
    this.scraper = new Scraper(token);
    this.IOHandler = handler;
  }

  public updateAll() {

  }

  public async updateRepos(): Promise<RepoModel[]> {
    const res = await this.scraper.scrapeRepos();
    const l: RepoModel[] = [];
    res.forEach((v) => {
      l.push(RepoModelConverter.convert(v));
    });
    return l;
  }

  public async updateUs(): Promise<UserModel> {
    return UserModelConverter.convert(await this.scraper.scrapeUser());
  }

  public getRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }
}