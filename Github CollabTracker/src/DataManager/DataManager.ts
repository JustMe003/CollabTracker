import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel, UserModel } from "../Models";
import { UserWriter } from "../Writers/UserWriter";
import { WriteHandler } from "../Writers/WriteHandler";

export class DataManager {
  private scraper: Scraper;
  private repos: RepoModel[] = [];
  private us: UserModel | null = null;

  constructor(token: string) {
    this.scraper = new Scraper(token);
    this.getUserData().finally(() => {
      console.log(this.us);
      const wh = new WriteHandler(this.us?.getUserName() ?? "test");
      wh.init();
      wh.writeUser(this.us ?? {});
    });
  }

  private async getUserData(): Promise<void> {
    this.us = new UserModel(await this.scraper.scrapeUser());
  }

  // private async getAllRepos(): Promise<void> {
  //   // this.repos = (await this.scraper.scrapeRepos()).forEach((m) => {});
  // }
}