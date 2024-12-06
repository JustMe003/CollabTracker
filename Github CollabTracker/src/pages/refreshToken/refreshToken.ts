import { Authentication } from "../../authorization/authentication";
import { GitRefreshCookie } from "../../authorization/cookies/GitRefreshCookie";
import router from "../../router/router";

export async function refreshToken() {
  const cookie = GitRefreshCookie.getRefreshCookie();
  if(cookie) {
    const res = await Authentication.requestRefreshToken(cookie);
    res.saveCookies();
    router.push("/Home");
  }
}