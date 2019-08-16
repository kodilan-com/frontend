import allLocations from '../assets/data/locations';

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_RECENT_POSTS = 'SET_RECENT_POSTS';
export const SET_ALL_POSTS = 'SET_ALL_POSTS';
export const SET_FEATURED = 'SET_FEATURED';
export const SET_TAGS = 'SET_TAGS';
export const SET_AVAILABLE_LOCATIONS = 'SET_AVAILABLE_LOCATIONS';
export const SET_ACTIVE_PERIOD = 'SET_ACTIVE_PERIOD';
export const RECENT_POST_COUNT = 25;
export const JOB_TYPE_MAP = {
  0: 'Tam zamanlı',
  1: 'Tam zamanlı',
  2: 'Yarı zamanlı',
  3: 'Stajyer',
  4: 'Freelance',
};

export const PERIODS = [
  {
    type: 'daily',
    text: 'Bugün',
    slug: 'bugun',
  },
  {
    type: 'weekly',
    text: 'Bu hafta',
    slug: 'bu-hafta',
  },
  {
    type: 'monthly',
    text: 'Bu ay',
    slug: 'bu-ay',
    isDefault: true,
  },
];

export const SEARCH_TYPE_ALIAS = [
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
  ...allLocations.map(item => ({
    path: `?location=${item}`,
    alias: item,
  })),
];

export const JOB_TYPE_SLUG_TO_ID_MAP = {
  'tam-zamanli': 1,
  'yari-zamanli': 2,
  stajyer: 3,
  freelance: 4,
};

export const JOB_TYPE_ID_TO_SLUG_MAP = {
  1: 'tam-zamanli',
  2: 'yari-zamanli',
  3: 'stajyer',
  4: 'freelance',
};

export const JOB_TYPES_FOR_DROPDOWN = [
  {
    id: 1,
    text: 'Tam zamanlı',
  },
  {
    id: 2,
    text: 'Yarı zamanlı',
  },
  {
    id: 3,
    text: 'Stajyer',
  },
  {
    id: 4,
    text: 'Freelance',
  },
];
