import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/classes.css"
import "@/assets/css/main.css"
import Ads from 'vue-google-adsense'
import './registerServiceWorker'


Vue.config.productionTip = false;
export const bus = new Vue();
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

Vue.component("font-awesome-icon", FontAwesomeIcon);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
