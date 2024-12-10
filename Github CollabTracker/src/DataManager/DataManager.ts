import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel, UserModel } from "../Models";

export class DataManager {
  private scraper: Scraper;
  private repos: RepoModel[] = [];
  private us: UserModel | null = null;

  constructor(token: string) {
    this.scraper = new Scraper(token);
    this.getUserData().finally(() => {
      console.log(this.us);
    });
  }

  private async getUserData(): Promise<void> {
    this.us = new UserModel(await this.scraper.scrapeUser());
  }

  // private async getAllRepos(): Promise<void> {
  //   // this.repos = (await this.scraper.scrapeRepos()).forEach((m) => {});
  // }
}