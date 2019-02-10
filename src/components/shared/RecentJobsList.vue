<script>
import { mapState, mapActions } from 'vuex';
import JobListing from './JobListing';

export default {
  components: {
    JobListing,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['recentPosts']),
  },
  methods: {
    ...mapActions(['fetchRecentPosts']),
  },
  created() {
    this.fetchRecentPosts().then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<template>
  <div class="eleven columns">
    <div class="padding-right">
      <h3 class="margin-bottom-25">
        En son eklenen ilanlar
      </h3>
      <job-listing
        :is-loading="isLoading"
        :posts="recentPosts"
      />
      <router-link
        to="/tum-ilanlar"
        class="button centered"
        v-if="!isLoading && recentPosts.length"
      >
        <i class="fa fa-plus-circle" />
        Tüm ilanları gör
      </router-link>
      <div class="margin-bottom-55" />
    </div>
  </div>
</template>
