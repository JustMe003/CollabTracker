import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { DataManager } from "../../DataManager/DataManager";
import router from "../../router/router";

export function test() {
    const dataManager = new DataManager(GitTokenCookie.getGitTokenCookie() as string);
  }
  
export function logOut() {
    console.log("Logged out");
    GitTokenCookie.removeGitCookie();
    GitRefreshCookie.removeRefreshCookie();
    router.push("/Authentication");
  }