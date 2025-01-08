import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel } from "../Models";
import { IOHandler } from "../IO/IOHandler";

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
      l.push(new RepoModel(v.id, v.html_url, 0, v.updated_at));
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