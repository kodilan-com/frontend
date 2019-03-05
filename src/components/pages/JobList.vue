<script>
import { mapState, mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';

export default {
  components: {
    JobListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
    };
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
  <div>
    <job-listing-with-filters
      :is-loading="isLoading"
      :posts="allPosts"
    >
      <h1 slot="headerText">
        Tüm ilanlar
      </h1>
    </job-listing-with-filters>
  </div>
</template>
