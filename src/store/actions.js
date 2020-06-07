import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import * as constants from './constants';
import helpers from './helpers';
/**
 * todo: add json
 *  {
 *  "position": "",
 *  "description": "",
 *  "apply_url": "",
 *  "apply_email": "",
 *  "location": "",
 *  "type": null,
 *  "company": {
 *      "name": "",
 *      "email": "",
 *      "logo": "",
 *     "www": "",
 *     "twitter": "",
 *    "linkedin": ""
 *},
 *"tags": [  // is not required
 *   {"name": ""}
 *]
 *}
 */
/* baseURL: 'https://api.kodilan.com', */
const http = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default {
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
  fetchRecentPosts({ state, commit }) {
    return http.get(`/posts?per_page=${constants.RECENT_POST_COUNT}&period=${state.activePeriod}`)
      .then((res) => {
        commit(constants.SET_RECENT_POSTS, res.data.results);

        return res.data.results;
      });
  },
  fetchFeaturedPosts({ commit }) {
    return http.get('/posts?per_page=3&is_featured=1')
      .then((res) => {
        commit(constants.SET_FEATURED, res.data.results);

        return res.data.results;
      });
  },
  fetchAllPosts({ commit }, payload = {}) {
    const page = payload
    && payload.page
    && Number.isInteger(payload.page)
    && payload.page > 1 ? payload.page : 1;

    return http.get(`/posts?per_page=${constants.PER_PAGE}&page=${page}`)
      .then((res) => {
        const { data } = res;
        commit(constants.SET_ALL_POSTS, data.results);
        commit(constants.SET_ALL_POST_META, {
          total: data.count,
          current_page: data.links.next,
          last_page: data.links.prev,
        });

        return res.data.results;
      });
  },
  fetchBySlug(_, slug) {
    return http.get(`/posts/slug/${slug}`)
      .then(res => res.data);
  },
  fetchByCompany(_, company) {
    return http.get(`/posts?company=${company}`)
      .then(res => res.data.results);
  },
  fetchByTag(_, tag) {
    return http.get(`/posts?tag=${tag}`)
      .then(res => res.data.results);
  },
  search(_, params) {
    return http.get(`/posts?search=${(params.query) ? params.query : ''}&location=${(params.location) ? params.location : ''}&type=${(params.type) ? params.type : ''}`)
      .then(res => res.data.results);
  },
  fetchTags({ commit }) {
    return http.get('/tags')
      .then((res) => {
        commit(constants.SET_TAGS, res.data.results);
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
      .then(res => helpers.rankPosts(post, postTags, res.data.results));
  },
  fetchAvailableLocations({ commit }) {
    return http.get('/locations')
      .then((res) => {
        commit(constants.SET_AVAILABLE_LOCATIONS, res.data.results);
      });
  },
  savePost(_, data) {
    return http.post('/posts', data);
  },
  subscribe(_, data) {
    return http.post('/newsletters', data);
  },
  setPeriod({ commit }, period) {
    commit('SET_ACTIVE_PERIOD', period);
  },
};
