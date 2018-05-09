import axios from 'axios';
import * as constants from './constants';

const API_ROOT = 'https://api.kodilan.com/';

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  fetchRecentPosts({ commit }) {
    const endpoint = `${API_ROOT}/posts`;

    return axios.get(endpoint).then((res) => {
      commit('SET_RECENT_POSTS', res.data.data);

      return res.data;
    });
  },
  fetchAllPosts({ commit }) {
    const endpoint = `${API_ROOT}/posts`;

    return axios.get(endpoint).then((res) => {
      commit('SET_ALL_POSTS', res.data.data);

      return res.data;
    });
  },
  fetchBySlug(_, slug) {
    const endpoint = `${API_ROOT}/posts/${slug}`;

    return axios.get(endpoint).then(res => res.data);
  },
  search(_, params) {
    const endpoint = `${API_ROOT}/search`;

    return axios.get(endpoint, { params }).then(res => res.data);
  },
  fetchTags({ commit }) {
    const endpoint = `${API_ROOT}/tags`;

    return axios.get(endpoint).then((res) => {
      commit('SET_TAGS', res.data.data);
    });
  },
  savePost(_, data) {
    const endpoint = `${API_ROOT}/posts`;

    return axios.post(endpoint, data);
  },
};
