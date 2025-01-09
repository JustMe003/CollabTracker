import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import router from "../../router/router";
  
export class Application {
  
  public logOut() {
    GitTokenCookie.removeGitCookie();
    GitRefreshCookie.removeRefreshCookie();
    console.log("Logged out");
    router.push("/Authentication");
  }

  public startMain() {
    
  }
}