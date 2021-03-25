import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import {store} from './store.store'

Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  store:store,
  router,
  render: h => h(App)
}).$mount("#app");
