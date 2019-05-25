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
  [constants.SET_FEATURED](state, featuredPosts) {
    state.featuredPosts = featuredPosts;
  },
  [constants.SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [constants.SET_LOCATIONS](state, locations) {
    state.locations = locations.map(l => l.location);
  },
};
