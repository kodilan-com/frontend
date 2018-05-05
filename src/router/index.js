import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Submit from '@/components/Submit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit,
    },
  ],
});
