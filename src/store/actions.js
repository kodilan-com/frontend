import * as constants from './constants';

export default {
  setData({ commit }, { companies, tags, posts }) {
    commit(constants.SET_DATA, { companies, tags, posts });
  },
};
