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
  companies(state) {
    if (state.user) {
      return state.user.companies;
    }

    return null;
  },
  locations(state) {
    return state.locationList;
  },
};
