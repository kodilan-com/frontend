import { PERIODS } from './constants';

export default {
  isLoading: true,
  recentPosts: [],
  activePeriod: PERIODS.find(period => period.isDefault).type,
  featuredPosts: [],
  allPosts: [],
  allPostsMeta: {},
  tags: [],
  availableLocations: ['Remote', 'İstanbul', 'İzmir', 'Ankara', 'Bursa'],
  user: null,
  locationList: [],
};
