import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import { store } from './store/store'
import axios from "axios";
import {constants} from './store/constants';
import Echo from 'laravel-echo';
axios.defaults.baseURL = constants.API_BASE_URL;
window.axios = require('axios').default;
window.Pusher = require('pusher-js');
window.echo = new Echo({
    broadcaster: 'pusher',
    key: constants.PUSHER_APP_KEY,
    cluster: constants.PUSHER_CLUSTER,
    forceTLS: true,
    wsHost: 'http://namerator.test/api',
    authHost: "http://namerator.test/api",
    authEndpoint:'http://namerator.test/api/broadcasting/auth',
});
Vue.config.productionTip = false;
Vue.use(Argon);

new Vue({
  store,
  router,
  created () {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const userData = JSON.parse(userInfo)
      this.$store.commit('setUserData', userData)
    }
    window.axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            this.$store.dispatch('logout')
          }
          return Promise.reject(error)
        }
    )
  },
  render: h => h(App)
}).$mount("#app");
