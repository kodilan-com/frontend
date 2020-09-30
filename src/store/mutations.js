import * as constants from './constants';

export default {
  [constants.TOGGLE_LOADING](state) {
    state.isLoading = !state.isLoading;
  },
  [constants.SET_RECENT_POSTS](state, recentPosts) {
    state.recentPosts = recentPosts;
  },
  [constants.SET_ALL_POSTS](state, allPosts) {
    state.allPosts = allPosts;
  },
  [constants.SET_ALL_POST_META](state, meta) {
    state.allPostsMeta = meta;
  },
  [constants.SET_DEVELOPER_SEARCH_META](state, meta) {
    state.developerSearchMeta = meta;
  },
  [constants.SET_FEATURED](state, featuredPosts) {
    state.featuredPosts = featuredPosts;
  },
  [constants.SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [constants.SET_AVAILABLE_LOCATIONS](state, locations) {
    state.availableLocations = locations;
  },
  [constants.SET_DEVELOPER_LOCATIONS](state, locations) {
    state.developerLocations = locations;
  },
  [constants.SET_ACTIVE_PERIOD](state, period) {
    state.activePeriod = period;
  },
  [constants.USER](state, user) {
    state.user = user;
  },
  [constants.ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
  },
  [constants.LOCATION_LIST](state, list) {
    state.locationList = list;
  },
};
