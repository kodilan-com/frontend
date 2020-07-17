export default {
  autocompleteTags(state) {
    return state.tags.map(tag => ({ label: tag.name, value: tag.slug }));
  },
  accessToken(state) {
    return state.accessToken;
  },
  user(state) {
    return state.user;
  },
};
