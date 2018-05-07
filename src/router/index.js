import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import AddJob from '@/components/pages/AddJob';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        hasBanner: true,
      },
    },
    {
      path: '/ilan-ekle',
      name: 'AddJob',
      component: AddJob,
    },
  ],
});
