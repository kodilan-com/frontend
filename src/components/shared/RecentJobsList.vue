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
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        En son eklenen ilanlar
      </h3>
      <div class="margin-bottom-30" />
      <job-period-selector />
      <div class="margin-bottom-25" />
      <job-listing
        :is-loading="isLoading"
        :posts="recentPosts"
      />
      <router-link
        to="/ilanlar"
        class="button centered tag-all-posts"
        v-if="!isLoading && recentPosts.length"
      >
        <!--<i class="fa fa-plus-circle" />-->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Tüm ilanları gör
      </router-link>
      <div class="margin-bottom-55" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 500;

    svg {
      width: 24px;
      height: 24px;
      background-color: #26ae61;
      stroke: #FFF;
      margin-right: 12px;
      padding: 8px;
      border-radius: 50%;
    }
  }

</style>
