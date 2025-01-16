import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { Controller } from "../../Controller/Controller";
import { DataManager } from "../../DataManager/DataManager";
import router from "../../router/router";
  
export class Application {

  dataManager: DataManager = {} as DataManager;
  
  public logOut() {
    GitTokenCookie.removeGitCookie();
    GitRefreshCookie.removeRefreshCookie();
    console.log("Logged out");
    router.push("/Authentication");
  }

  public async startMain() {
    const controller = new Controller(GitTokenCookie.getGitTokenCookie() || "");
    this.dataManager = await controller.getDataManager();
    console.log("got datamanager");
    await this.dataManager.updateData();
    console.log("all updated!");
  }

  public async refresh() {
    await this.dataManager.updateData();
    console.log("all updated!");
  }
}