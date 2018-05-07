import axios from 'axios';
import * as constants from './constants';

const API_ROOT = 'https://api.kodilan.com/';
const mock = {
  current_page: 1,
  data: [
    {
      slug: 'gitlab-sr-frontend-engineer',
      position: 'Sr. Frontend Engineer',
      description: 'Lorem ipsum sit dolor amet',
      apply_url: 'https://gitlab.com/jobs',
      apply_email: 'jobs@gitlab.com',
      location: 'Remote',
      type: 0,
      status: 0,
      is_featured: 0,
      created_at: '2018-05-07 10:17:21',
      company: {
        name: 'GitLab',
        slug: 'gitlab',
        email: 'jobs@gitlab.com',
        logo:
          'https://gitlab.com/gitlab-com/gitlab-artwork/raw/master/wordmark/stacked_wm_no_bg.png',
        www: 'https://gitlab.com',
        twitter: 'gitlab',
        linkedin: 'https://www.linkedin.com/company/gitlab-com/',
      },
      tags: [
        {
          name: 'php',
          slug: 'php',
        },
        {
          name: 'js',
          slug: 'js',
        },
        {
          name: 'devops',
          slug: 'devops',
        },
      ],
    },
    {
      slug: 'digital-ocean-frontend-developer',
      position: 'Frontend Developer',
      description: 'Digital Ocean is looking for a talented Frontend developer',
      apply_url: 'https://digitalocean.com/apply/',
      apply_email: 'jobs@digitalocean.com',
      location: 'Istanbul',
      type: 0,
      status: 0,
      is_featured: 0,
      created_at: '2018-05-07 12:07:43',
      company: {
        name: 'Digital Ocean',
        slug: 'digital-ocean',
        email: 'jobs@digitalocean.com',
        logo: 'https://img.stackshare.io/service/295/DO_Logo_icon_blue.png',
        www: 'https://digitalocean.com',
        twitter: 'DigitalOcean',
        linkedin: 'https://www.linkedin.com/company/digitalocean/',
      },
      tags: [
        {
          name: 'js',
          slug: 'js',
        },
        {
          name: 'devops',
          slug: 'devops',
        },
        {
          name: 'vue',
          slug: 'vue',
        },
      ],
    },
  ],
  first_page_url: 'https://api.kodilan.com/posts?page=1',
  from: 1,
  last_page: 1,
  last_page_url: 'https://api.kodilan.com/posts?page=1',
  next_page_url: null,
  path: 'https://api.kodilan.com/posts',
  per_page: 15,
  prev_page_url: null,
  to: 2,
  total: 2,
};

export default {
  fetchRecentPosts({ commit }) {
    // const endpoint = `${API_ROOT}/posts`;
    const endpoint = '/';

    return axios.get(endpoint).then((res) => {
      // commit('SET_RECENT_POSTS', res.data);
      commit('SET_RECENT_POSTS', mock.data);
    });
  },
  fetchAllPosts({ commit }) {
    // const endpoint = `${API_ROOT}/posts`;
    const endpoint = '/';

    return axios.get(endpoint).then((res) => {
      // commit('SET_RECENT_POSTS', res.data);
      commit('SET_ALL_POSTS', mock.data);
    });
  },
  toggleLoading({ commit }) {
    commit(constants.TOGGLE_LOADING);
  },
};
