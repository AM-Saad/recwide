import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/classes.css"
import "@/assets/css/main.css"

import './registerServiceWorker'


Vue.config.productionTip = false;
export const bus = new Vue();

Vue.component("font-awesome-icon", FontAwesomeIcon);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
