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
  {
    path: 'firmalarim',
    component: () => import('../components/pages/dashboard/MyCompanies'),
  },
  {
    path: 'firmalarim/ekle',
    component: () => import('../components/pages/dashboard/CompanyForm'),
  },
  {
    path: 'firmalarim/:companyId/duzenle',
    component: () => import('../components/pages/dashboard/CompanyForm'),
  },
];

export default dashboardRoutes;
