<script>
import { mapState, mapActions } from 'vuex';
import JobListing from '../shared/JobListing';
import Loader from '../shared/Loader';
import { JOB_TYPE_MAP } from '../../store/constants';

export default {
  data() {
    return {
      isLoading: true,
      posts: [],
    };
  },
  components: {
    JobListing,
    Loader,
  },
  computed: {
    location() {
      return this.$route.query.location;
    },
    query() {
      return this.$route.query.query;
    },
    type() {
      return this.$route.query.type;
    },
    company() {
      return this.$route.query.company;
    },
    jobTypeString() {
      return JOB_TYPE_MAP[this.type];
    },
  },
  methods: {
    ...mapActions(['search']),
    handleSearch() {
      this.isLoading = true;
      this.search(this.$route.query)
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
};
</script>

<template>
  <div class="container">
    <loader v-if="isLoading" />
    <div
      v-if="posts.length && !isLoading"
      class="columns sixteen">
      <h2 class="margin-bottom-25">
        <template v-if="company">
          <strong>{{company}}</strong> firmasındaki
        </template>
        <template v-if="type">
          <strong>{{jobTypeString}}</strong> çalışma tipindeki
        </template>
        <template v-if="location">
          <strong>{{location}}</strong>
          <template v-if="location !== 'Remote'">bölgesindeki</template>
        </template>
        <template v-if="query">
          <strong>{{query}}</strong> anahtar kelimesine sahip
        </template>
        <template v-if="location || query || type || company">ilanlar</template>
      </h2>
      <job-listing
        :is-loading="false"
        :posts="posts"
      />
    </div>
    <div
      v-if="!posts.length && !isLoading"
      class="notification warning"
    >
      <p>Bu aramaya göre ilan bulamadık.</p>
    </div>
  </div>
</template>
