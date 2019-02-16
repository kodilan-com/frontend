import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';
import Home from '@/components/pages/Home';
import AddJob from '@/components/pages/AddJob';
import JobDetails from '@/components/pages/JobDetails';
import JobList from '@/components/pages/JobList';
import TagPosts from '@/components/pages/TagPosts';
import Search from '@/components/pages/Search';
import Confirmation from '@/components/pages/Confirmation';
import NotFound from '@/components/pages/NotFound';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
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
      path: '/ilanlar/:slug',
      name: 'JobDetails',
      component: JobDetails,
    },
    {
      path: '/ilanlar',
      name: 'JobList',
      component: JobList,
    },
    {
      path: '/etiket/:slug',
      name: 'TagPosts',
      component: TagPosts,
    },
    {
      path: '/ilan-ara',
      name: 'Search',
      component: Search,
    },
    {
      path: '/ilan/dogrulandi',
      name: 'Confirmation',
      component: Confirmation,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
