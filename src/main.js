import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/css/classes.css"
import "@/assets/css/main.css"
import VueMeta from "vue-meta";

import Ads from 'vue-google-adsense'
import './registerServiceWorker'


Vue.config.productionTip = false;
export const bus = new Vue();
Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(VueMeta);

Vue.component("font-awesome-icon", FontAwesomeIcon);



router.beforeEach((to, from, next) => {
  window.stop()
  const token = localStorage.getItem("ut");
  const expiryDate = localStorage.getItem("uexpiryd");
  if (to.matched.some(record => record.meta.requiredAuth)) {
    const oneday = 60 * 60 * 24 * 1000

    if (token == null || token === undefined || new Date(expiryDate) < oneday) {
      next({
        path: '/auth/login',
      });
    } else {
      next();
    }
  } else {
    return next();
  }
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
