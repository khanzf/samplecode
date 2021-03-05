import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
/// user defined routes
import router from './router';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from './plugins/vuetify';

import timeAgo from './filters/timeAgo';
Vue.filter('timeAgo', timeAgo);

Vue.use(VueRouter);
Vue.config.productionTip = false;
const axiosConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000,
};
import { AxiosStatic } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $http: AxiosStatic;
    }
}

Vue.prototype.$http = axios.create(axiosConfig);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
