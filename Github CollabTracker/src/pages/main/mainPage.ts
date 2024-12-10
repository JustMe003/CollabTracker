import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "../../authorization/cookies/GitTokenCookie";
import { DataManager } from "../../DataManager/DataManager";
import { FileStorage } from "../../FileIO/FileStorage";
import router from "../../router/router";

export async function test() {
  const storage = new FileStorage();
  await storage.init();
  const token = GitTokenCookie.getGitTokenCookie();
  if (token) {
    const manager = new DataManager(token);
    const us = await manager.getUser();
    storage.initUserStorage(us.getUserName());
    // Now we have storage yay :)
  }
}
  
export function logOut() {
  console.log("Logged out");
  GitTokenCookie.removeGitCookie();
  GitRefreshCookie.removeRefreshCookie();
  router.push("/Authentication");
}