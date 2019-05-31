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
  [constants.SET_AVAILABLE_LOCATIONS](state, locations) {
    state.availableLocations = locations.reduce((arr, loc) => {
      if (loc.location !== 'Remote') {
        arr.push(loc.location);
      }

      return arr;
    }, ['Remote']);
  },
  [constants.SET_TOPBAR_STATUS](state, status) {
    state.topbarStatus = status;
    localStorage.setItem('kodIlanTopbarStatus', status);
  },
};
