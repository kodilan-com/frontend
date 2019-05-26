<script>
import { mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';
import tagsPageMetaInfoMixin from '../../mixins/tagsPageMetaInfo';

export default {
  mixins: [tagsPageMetaInfoMixin],
  components: {
    JobListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
      slug: null,
      posts: [],
    };
  },
  computed: {
    tag() {
      return this.slug || this.$route.params.slug;
    },
  },
  methods: {
    ...mapActions(['fetchByTag']),
    handleSearch() {
      this.fetchByTag(this.tag)
        .then((res) => {
          this.posts = res.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.handleSearch();
  },
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    this.slug = to.params.slug;
    this.handleSearch();

    next();
  },
};
</script>

<template>
  <job-listing-with-filters
    :posts="posts"
    :is-loading="isLoading"
  >
    <h1 slot="headerText" ref="headline">
      <strong>{{ tag }}</strong> etiketli ilanlar
    </h1>
  </job-listing-with-filters>
</template>
