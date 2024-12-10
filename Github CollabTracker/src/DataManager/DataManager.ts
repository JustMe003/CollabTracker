import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel, UserModel } from "../Models";
import { WriteHandler } from "../Writers/WriteHandler";

export class DataManager {
  private scraper: Scraper;
  private repos: RepoModel[] = [];
  private us: UserModel | null = null;

  constructor(token: string) {
    this.scraper = new Scraper(token);
    const wh = new WriteHandler(this.us?.getUserName() ?? "test");
    this.getUserData().finally(() => {
      console.log(this.us);
      wh.init().finally(() => {
        wh.writeUser(this.us ?? {});
      });
    });
    this.getAllRepos().finally(() => {
      console.log(this.repos);
      wh.init().finally(() => {
        wh.writeRepos(this.repos);
      })
    });
  }

  private async getUserData(): Promise<void> {
    this.us = new UserModel(await this.scraper.scrapeUser());
  }

  private async getAllRepos(): Promise<void> {
    (await this.scraper.scrapeRepos()).forEach((m) => {
      this.repos.push(new RepoModel(m));
    });
  }
}