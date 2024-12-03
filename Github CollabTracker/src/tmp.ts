import { DefineComponent } from "vue";
import { GitRefreshCookie } from "./authorization/cookies/GitRefreshCookie";
import { GitTokenCookie } from "./authorization/cookies/GitTokenCookie";
import AuthPage from "./pages/authentication/authPage.vue";
import MainPage from "./pages/main/mainPage.vue";
import RefreshToken from "./pages/refreshToken/refreshToken.vue";

export abstract class tmp {
  
  public static route(): DefineComponent<{}, {}, any> {
    const gitCookie = GitTokenCookie.getGitTokenCookie();
    const refreshCookie = GitRefreshCookie.getRefreshCookie();
    if(gitCookie) {
      // go to main page
      return MainPage;
    } else if(refreshCookie) {
      // refresh token
      // go to refresh token
      // const authenticationData = await Authentication.requestRefreshToken(refreshCookie);
      return RefreshToken;
    } else {
      // const verificationData = await Authentication.startAuthentication();
      // show login page
      return AuthPage;
    }
  }

  
}
