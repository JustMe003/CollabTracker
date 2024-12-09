import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { WriteHandler } from "./Writers/WriteHandler";

const writer = new WriteHandler();
writer.init();

createApp(App)
  .use(router)
  .mount("#app");
