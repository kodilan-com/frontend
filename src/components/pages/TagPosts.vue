<script>
import { mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';

export default {
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
    ...mapActions(['search']),
    handleSearch() {
      this.search({ tag: this.tag })
        .then((res) => {
          this.isLoading = false;
          this.posts = res.data;
        })
        .catch(() => {
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
    :has-header="true"
  >
    <h2 slot="headerText">
      <strong>{{ tag }}</strong> etiketli ilanlar
    </h2>
  </job-listing-with-filters>
</template>
