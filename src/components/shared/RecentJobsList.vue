<script>
import { mapState, mapActions } from 'vuex';
import JobListing from './JobListing';
import JobPeriodSelector from './JobPeriodSelector';
import { PERIODS } from '../../store/constants';

export default {
  components: {
    JobListing,
    JobPeriodSelector,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(['recentPosts', 'activePeriod']),
  },
  methods: {
    ...mapActions(['fetchRecentPosts', 'setPeriod']),
    fetch() {
      this.isLoading = true;

      this.fetchRecentPosts()
        .then(() => {
          this.isLoading = false;
        });
    },
    setPeriodHandler() {
      const period = PERIODS.find(p => p.type === this.$route.meta.period);
      if (period) {
        this.setPeriod(period.type);
      }
      this.fetch();
    },
  },
  watch: {
    $route(to, from) {
      if (to.meta.period !== from.meta.period) this.setPeriodHandler();
    },
  },
  created() {
    this.setPeriodHandler();
  },
};
</script>

<template>
  <div class="eleven columns">
    <div class="padding-right">
      <h3 class="margin-bottom-25">
        En son eklenen ilanlar
      </h3>
      <job-period-selector />
      <job-listing
        :is-loading="isLoading"
        :posts="recentPosts"
      />
      <router-link
        to="/ilanlar"
        class="button centered tag-all-posts"
        v-if="!isLoading && recentPosts.length"
      >
        <i class="fa fa-plus-circle" />
        Tüm ilanları gör
      </router-link>
      <div class="margin-bottom-55" />
    </div>
  </div>
</template>
