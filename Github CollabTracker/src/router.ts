import { createMemoryHistory, createRouter } from "vue-router";
import MainPage from "./pages/main/mainPage.vue";
import AuthPage from "./pages/authentication/authPage.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/Home", component: MainPage },
    { path: "/Authentication", component: AuthPage },
    { path: "/", redirect: "/Home" }
  ]
});

export default router;