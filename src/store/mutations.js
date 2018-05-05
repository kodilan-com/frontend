import * as constants from './constants';

export default {
  [constants.SET_DATA](state, { companies, tags, posts }) {
    const companiesById = companies.reduce((acc, company) => {
      acc[company.id] = company;
      return acc;
    }, {});

    const tagsById = tags.reduce((acc, tag) => {
      acc[tag.id] = tag;
      return acc;
    }, {});

    const normalizedPosts = posts.map((post) => {
      const tagsMap = post.tags.map(tag => tagsById[tag.id]);

      return {
        ...post,
        tags: tagsMap,
        company: companiesById[post.company.id],
      };
    });

    Object.assign(state, { companies, tags, posts: normalizedPosts });
  },

  [constants.TOGGLE_LOADING](state) {
    Object.assign(state, { isLoading: !state.isLoading });
  },
};
