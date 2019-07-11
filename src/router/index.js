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
import SubscribeLanding from '@/components/pages/SubscribeLanding';
import NotFound from '@/components/pages/NotFound';
import CompanyPosts from '@/components/pages/CompanyPosts';
import { PERIODS } from '../store/constants';

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
      // For SEO concern, we want to have period slugs as a root route
      children: PERIODS.map(period => ({
        path: period.slug,
        component: Home,
        meta: {
          period: period.type,
          hasBanner: true,
        },
      })),
    },
    {
      path: '/ilan-ekle',
      name: 'AddJob',
      component: AddJob,
    },
    {
      path: '/ilanlar',
      name: 'JobList',
      component: JobList,
    },
    {
      path: '/ilanlar/sayfa/:page',
      props: true,
      name: 'JobList',
      component: JobList,
    },
    {
      path: '/ilanlar/:slug',
      name: 'JobDetails',
      component: JobDetails,
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
      children: [
        {
          path: '?type=1',
          alias: 'tam-zamanli',
        },
        {
          path: '?type=2',
          alias: 'yari-zamanli',
        },
        {
          path: '?type=3',
          alias: 'stajyer',
        },
        {
          path: '?type=4',
          alias: 'freelance',
        },
      ],
    },
    {
      path: '/ilan/dogrulandi',
      name: 'Confirmation',
      component: Confirmation,
    },
    {
      path: '/firmalar/:slug',
      name: 'CompanyPosts',
      component: CompanyPosts,
    },
    {
      path: '/abone-ol',
      name: 'Subscribe',
      component: SubscribeLanding,
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

export default router;
