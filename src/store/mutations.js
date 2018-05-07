import * as constants from './constants';

export default {
  [constants.TOGGLE_LOADING](state) {
    Object.assign(state, { isLoading: !state.isLoading });
  },
  [constants.SET_RECENT_POSTS](state, recentPosts) {
    Object.assign(state, { recentPosts });
  },
  [constants.SET_ALL_POSTS](state, allPosts) {
    Object.assign(state, { allPosts });
  },
};
