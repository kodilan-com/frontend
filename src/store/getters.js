export default {
  autocompleteTags(state) {
    return state.tags.map(tag => ({ label: tag.name, value: tag.slug }));
  },
  topbarStatus: state => state.topbarStatus !== 'closed',
};
