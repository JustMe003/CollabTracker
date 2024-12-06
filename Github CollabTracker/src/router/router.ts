import { createMemoryHistory, createRouter } from "vue-router";
import MainPage from "../pages/main/mainPage.vue"
import AuthPage from "../pages/authentication/authPage.vue";
import { GitTokenCookie } from "../authorization/cookies/GitTokenCookie";
import { GitRefreshCookie } from "../authorization/cookies/GitRefreshCookie";
import RefreshToken from "../pages/refreshToken/refreshToken.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/Home", component: MainPage, name: "Home" },
    { path: "/Authentication", component: AuthPage, name: "Authentication" },
    { path: "/RefreshToken", component: RefreshToken, name: "RefreshToken" },
    { path: "/", redirect: "/Home" }
  ]
});

router.beforeEach((to) => {
  const cookie = GitTokenCookie.getGitTokenCookie();
  if(!cookie) {
    const refreshCookie = GitRefreshCookie.getRefreshCookie();
    if(refreshCookie) {
      if(to.name != "RefreshToken") {
        return { name: "RefreshToken" };
      }
    } else {
      if(to.name != "Authentication") {
        return { name: "Authentication" };
      }
    }
  }
});

export default router;