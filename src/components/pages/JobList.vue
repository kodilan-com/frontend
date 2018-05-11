<script>
import { mapState, mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    JobListingWithFilters,
  },
  computed: {
    ...mapState(['allPosts']),
  },
  methods: {
    ...mapActions(['fetchAllPosts']),
  },
  created() {
    this.fetchAllPosts().then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<template>
  <job-listing-with-filters
    :is-loading="isLoading"
    :posts="allPosts"
  >
    <h2 slot="headerText">
      Tüm ilanlar
    </h2>
  </job-listing-with-filters>
</template>
