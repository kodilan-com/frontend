import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as constants from './constants';

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
  savePost(_, data) {
    return http.post('/posts', data);
  },
  subscribe(_, data) {
    return http.post('/newsletters', data)
      .then(() => {
        alert('Email listesine kaydınız gerçekleştirildi.'); // eslint-disable-line
      })
      .catch((e) => {
        const details = Object.values(e.response.data.errors || [])
          .map(item => item[0])
          .join('\n');

        // eslint-disable-next-line
        alert(`Hata: Kaydınız gerçekleştirilemedi. \n\n${details || ''}`);
      });
  },
};
