import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';

Vue.use(Router);
Vue.use(Meta);

const dashboardRoutes = [
  {
    path: '',
    redirect: 'profil',
  },
  {
    path: 'profil',
    component: () => import('../components/pages/dashboard/Profile'),
  },
];

export default dashboardRoutes;
