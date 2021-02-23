import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

/// user defined routes
import router from './router';

import vuetify from './plugins/vuetify';


Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
