import { PERIODS } from './constants';

export default {
  isLoggedIn: localStorage.getItem('AccessToken') || null,
  me: {},
  manageJobs: [],
  isLoading: true,
  recentPosts: [],
  activePeriod: PERIODS.find(period => period.isDefault).type,
  featuredPosts: [],
  allPosts: [],
  allPostsMeta: {},
  tags: [],
  availableLocations: ['Remote', 'İstanbul', 'İzmir', 'Ankara', 'Bursa'],
};
