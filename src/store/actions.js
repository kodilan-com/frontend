import axios from 'axios';
import * as constants from './constants';

axios.defaults.baseURL = 'https://api.kodilan.com';

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  fetchRecentPosts({ commit }) {
    return axios.get('/posts?limit=10').then((res) => {
      commit('SET_RECENT_POSTS', res.data.data);

      return res.data;
    });
  },
  fetchFeaturedPosts({ commit }) {
    return axios.get('/posts?limit=3&is_featured=1').then((res) => {
      commit('SET_FEATURED', res.data.data);

      return res.data;
    });
  },
  fetchAllPosts({ commit }) {
    return axios.get('/posts').then((res) => {
      commit('SET_ALL_POSTS', res.data.data);

      return res.data;
    });
  },
  fetchBySlug(_, slug) {
    return axios.get(`/posts/${slug}`).then(res => res.data);
  },
  search(_, params) {
    return axios.get('/search', { params }).then(res => res.data);
  },
  fetchTags({ commit }) {
    return axios.get('/tags').then((res) => {
      commit('SET_TAGS', res.data.data);
    });
  },
  savePost(_, data) {
    return axios.post('/posts', data);
  },
  subscribe(_, data) {
    return axios.post('/newsletters', data);
  },
};
