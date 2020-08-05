import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as constants from './constants';
import helpers from './helpers';

const http = axios.create({
  baseURL: 'https://api.kodilan.com',
  // baseURL: 'http://localhost:8000/api',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
  headers: {
    common: {
      Authorization: localStorage.getItem('accessToken')
        ? `Bearer ${localStorage.getItem('accessToken')}` : '',
    },
  },
});

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  fetchRecentPosts({ state, commit }) {
    return http.get(`/posts?get=${constants.RECENT_POST_COUNT}&period=${state.activePeriod}`)
      .then((res) => {
        commit(constants.SET_RECENT_POSTS, res.data.data);

        return res.data;
      });
  },
  fetchFeaturedPosts({ commit }) {
    return http.get('/posts?get=3&is_featured=1')
      .then((res) => {
        commit(constants.SET_FEATURED, res.data.data);

        return res.data;
      });
  },
  fetchAllPosts({ commit }, payload = {}) {
    const page = payload
    && payload.page
    && Number.isInteger(payload.page)
    && payload.page > 1 ? payload.page : 1;

    return http.get(`/posts?get=${constants.PER_PAGE}&page=${page}`)
      .then((res) => {
        const { data } = res;
        commit(constants.SET_ALL_POSTS, data.data);
        commit(constants.SET_ALL_POST_META, {
          total: data.total,
          current_page: data.current_page,
          last_page: data.last_page,
        });

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
        commit(constants.SET_TAGS, res.data.data);
      });
  },
  fetchRelatedPosts({ dispatch }, post) {
    const postTags = post.tags.map(t => t.slug);
    const categoryTags = ['frontend', 'backend', 'mobile', 'designer', 'qa', 'devops'];
    const [mainTag] = postTags.filter(t => categoryTags.indexOf(t) > -1);

    if (!mainTag) {
      return Promise.resolve([]);
    }

    return dispatch('fetchByTag', mainTag)
      .then(res => helpers.rankPosts(post, postTags, res.data));
  },
  fetchAvailableLocations({ commit }) {
    return http.get('/posts/locations')
      .then((res) => {
        commit(constants.SET_AVAILABLE_LOCATIONS, res.data);
      });
  },
  subscribe(_, data) {
    return http.post('/newsletters', data);
  },
  setPeriod({ commit }, period) {
    commit('SET_ACTIVE_PERIOD', period);
  },
  getUser({ commit }) {
    return http.get('/user/me', { cache: false })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        commit(constants.USER, response.data.user);

        return response.data.user;
      })
      .catch(() => null);
  },
  setUser({ commit }, user) {
    localStorage.setItem('user', JSON.stringify(user));
    commit(constants.USER, user);
  },
  updateUser({ commit }, data) {
    return http.put('/user/me', data)
      .then((response) => {
        commit(constants.USER, response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response;
      });
  },
  updatePassword(_, data) {
    return http.put('/user/password', data);
  },
  setAccessToken({ commit }, accessToken) {
    localStorage.setItem('accessToken', accessToken);
    commit(constants.ACCESS_TOKEN, accessToken);
    http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  registerUser(_, data) {
    return http.post('/register', data);
  },
  verifyUser(_, data) {
    return http.post('/verify-email', data);
  },
  loginUser({ commit }, data) {
    return http.post('/login', data)
      .then((response) => {
        commit(constants.USER, response.data.user);

        return response;
      });
  },
  sendPasswordResetEmail(_, data) {
    return http.post('/send-password-reset', data);
  },
  resetPassword(_, data) {
    return http.post('/reset-password', data);
  },
  getCompany(_, companyId) {
    return http.get(`/companies/${companyId}`, { cache: false });
  },
  saveCompany(_, data) {
    if (data.companyId) {
      return http.put(`/companies/${data.companyId}`, data);
    }

    return http.post('/companies', data);
  },
  deleteCompany(_, companyId) {
    return http.delete(`/companies/${companyId}`);
  },
  addCompanyUser(_, data) {
    return http.post(`/companies/${data.companyId}/users`, data);
  },
  deleteCompanyUser(_, data) {
    return http.delete(`/companies/${data.companyId}/users/${data.userId}`);
  },
  setCompanyUserStatus(_, data) {
    return http.put(`/companies/${data.companyId}/users/${data.userId}`, data);
  },
  getPostList() {
    return http.get('/dashboard/posts', { cache: false });
  },
  getPost(_, postId) {
    return http.get(`/dashboard/posts/${postId}`, { cache: false });
  },
  savePost(_, data) {
    if (data.postId) {
      return http.put(`/dashboard/posts/${data.postId}`, data);
    }

    return http.post('/dashboard/posts', data);
  },
  deletePost(_, postId) {
    return http.delete(`/dashboard/posts/${postId}`);
  },
};
