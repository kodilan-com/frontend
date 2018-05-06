import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
