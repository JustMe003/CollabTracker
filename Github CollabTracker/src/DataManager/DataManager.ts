import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";
import { RepoModelConverter } from "../ModelConverter";

export class DataManager {
  private scraper: Scraper;
  private IOHandler: IOHandler;

  constructor(scraper: Scraper, handler: IOHandler) {
    this.scraper = scraper;
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

  public getRepos(): Promise<RepoModel[]> {
    return this.IOHandler.getRepos();
  }

  public writeRepos(repos: RepoModel[]) {
    this.IOHandler.writeRepos(repos);
  }
}