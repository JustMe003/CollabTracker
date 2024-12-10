import { Scraper } from "../ApiScraper/Scraper";
import { RepoModel } from "../Models/RepoModel";
import { UserModel } from "../Models/UserModel";

export class DataManager {
  private scraper: Scraper;
  private repos: RepoModel | null = null;
  private us: UserModel | null = null;

  constructor(token: string) {
    this.scraper = new Scraper(token);
    this.getUserData();
  }

  private async getUserData(): Promise<void> {
    this.us = await this.scraper.scrapeUser();
  }
}