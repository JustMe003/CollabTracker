import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { DataManager } from "../../DataManager/DataManager";
import { IOHandler } from "../../IO/IOHandler";
import router from "../../router/router";
  
export function logOut() {
  GitTokenCookie.removeGitCookie();
  GitRefreshCookie.removeRefreshCookie();
  console.log("Logged out");
  router.push("/Authentication");
}

export async function test() {
  const dataManager = new DataManager(GitTokenCookie.getGitTokenCookie() || "", new IOHandler());
  const data = await dataManager.updateRepos();
  console.log(data);
  const data2 = await dataManager.getRepos();
  console.log(data2);
}