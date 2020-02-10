export default {
  autocompleteTags(state) {
    return state.tags.map(tag => ({ label: tag.name, value: tag.slug }));
  },
  companyId(state) {
    return Object.keys(state.me).length && state.me.companies[0].id;
  }
};
