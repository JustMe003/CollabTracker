import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { Controller } from "../../Controller/Controller";
import router from "../../router/router";
  
export class Application {
  
  public logOut() {
    GitTokenCookie.removeGitCookie();
    GitRefreshCookie.removeRefreshCookie();
    console.log("Logged out");
    router.push("/Authentication");
  }

  public async startMain() {
    const controller = new Controller(GitTokenCookie.getGitTokenCookie() || "");
    const dataManager = await controller.getDataManager();
    await dataManager.updateAll();
    console.log("all updated!");
  }
}