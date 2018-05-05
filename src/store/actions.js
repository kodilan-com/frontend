import * as constants from './constants';
import api from '../services/api';

export default {
  setData({ commit }, { companies, tags, posts }) {
    commit(constants.SET_DATA, { companies, tags, posts });
  },
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  createJob({ commit }, data) {
    api.save(data).then(console.log);
  },
};
