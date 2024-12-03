import { createApp } from "vue";
import App from "./App.vue";
import { OurRouter } from "./router";



createApp(App)
  .use(OurRouter.createRouter())
  .mount("#app");
