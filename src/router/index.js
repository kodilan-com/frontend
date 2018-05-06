import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Submit from '@/components/Submit';
import Detail from '@/components/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/ilan/:id',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit,
    },
  ],
});
