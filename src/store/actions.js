import * as constants from './constants';
import api from '../services/api';

export default {
  fetchData({ commit }) {
    api.fetchData().then(({ companies, tags, posts }) => {
      commit(constants.SET_DATA, { companies, tags, posts });
    });
  },
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  createJob({ commit }, data) {
    return api.save(data).then(console.log);
  },
  findPostById({ commit }, id) {
    return api.fetchPostById(id);
  },
};
