import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { DataManager } from "../../DataManager/DataManager";
import { FileStorage } from "../../FileIO/FileStorage";
import { IOHandler } from "../../IO/IOHandler";
import router from "../../router/router";
  
export function logOut() {
  GitTokenCookie.removeGitCookie();
  GitRefreshCookie.removeRefreshCookie();
  console.log("Logged out");
  router.push("/Authentication");
}

export async function test() {
  const storage = new FileStorage("JustMe003");
  const handler = new IOHandler(storage);
  await handler.init(storage);
  const dataManager = new DataManager(GitTokenCookie.getGitTokenCookie() || "", handler);
  const data = await dataManager.updateRepos();
  console.log(data);
  const data2 = await dataManager.getRepos();
  console.log(data2);
  dataManager.writeRepos(data);
}