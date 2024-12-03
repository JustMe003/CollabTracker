import { createMemoryHistory, createRouter, Router } from "vue-router";
import MainPage from "./pages/main/mainPage.vue";
import AuthPage from "./pages/authentication/authPage.vue";
import App from "./App.vue";


export class OurRouter {

  public static createRouter(): Router {
    const routes = [
      { path: "/Home", component: MainPage },
      { path: "/Authentication", component: AuthPage },
      { path: "/", component: App }
    ];

    return createRouter({
      history: createMemoryHistory(),
      routes
    });
  }
}