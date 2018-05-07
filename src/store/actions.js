import axios from 'axios';
import * as constants from './constants';

const API_ROOT = 'https://api.kodilan.com/';

export default {
  fetchRecentPosts({ commit }) {
    const endpoint = `${API_ROOT}/posts`;

    return axios.get(endpoint).then((res) => {
      commit('SET_RECENT_POSTS', res.data.data);
    });
  },
  fetchAllPosts({ commit }) {
    const endpoint = `${API_ROOT}/posts`;

    return axios.get(endpoint).then((res) => {
      commit('SET_ALL_POSTS', res.data.data);
    });
  },
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
};
