import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as constants from './constants';
import helpers from './helpers';

const http = axios.create({
  baseURL: 'https://api.kodilan.com',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  fetchRecentPosts({ commit }) {
    return http.get('/posts?get=25')
      .then((res) => {
        commit('SET_RECENT_POSTS', res.data.data);

        return res.data;
      });
  },
  fetchFeaturedPosts({ commit }) {
    return http.get('/posts?get=3&is_featured=1')
      .then((res) => {
        commit('SET_FEATURED', res.data.data);

        return res.data;
      });
  },
  fetchAllPosts({ commit }) {
    return http.get('/posts?get=300')
      .then((res) => {
        commit('SET_ALL_POSTS', res.data.data);

        return res.data;
      });
  },
  fetchBySlug(_, slug) {
    return http.get(`/posts/${slug}`)
      .then(res => res.data);
  },
  fetchByCompany(_, company) {
    return http.get(`/companies/${company}/posts`)
      .then(res => res.data);
  },
  fetchByTag(_, tag) {
    return http.get(`/tags/${tag}/posts`)
      .then(res => res.data);
  },
  search(_, params) {
    return http.get('/search', { params })
      .then(res => res.data);
  },
  fetchTags({ commit }) {
    return http.get('/tags')
      .then((res) => {
        commit('SET_TAGS', res.data.data);
      });
  },
  fetchRelatedPosts({ dispatch }, post) {
    const postTags = post.tags.map(t => t.slug);
    const categoryTags = ['frontend', 'backend', 'mobile', 'designer', 'qa'];
    const mainCategories = postTags.filter(t => categoryTags.indexOf(t) > -1);

    return dispatch('fetchByTag', mainCategories[0])
      .then(res => helpers.rankPosts(post, postTags, res.data));
  },
  fetchAvailableLocations({ commit }) {
    return http.get('/posts/locations')
      .then((res) => {
        commit('SET_AVAILABLE_LOCATIONS', res.data);
      });
  },
  savePost(_, data) {
    return http.post('/posts', data);
  },
  subscribe(_, data) {
    return http.post('/newsletters', data);
  },
};
