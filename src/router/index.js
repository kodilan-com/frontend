import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import AddJob from '@/components/pages/AddJob';
import JobDetails from '@/components/pages/JobDetails';
import JobListing from '@/components/pages/JobListing';

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
    {
      path: '/ilan-detay/:slug',
      name: 'JobDetails',
      component: JobDetails,
    },
    {
      path: '/tum-ilanlar',
      name: 'JobListing',
      component: JobListing,
    },
  ],
});
