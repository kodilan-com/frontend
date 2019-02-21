<script>
import { mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';
import { JOB_TYPE_MAP } from '../../store/constants';

export default {
  components: {
    JobListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
      posts: [],
    };
  },
  computed: {
    location() {
      return this.$route.query.location;
    },
    query() {
      return this.$route.query.query;
    },
    type() {
      return parseInt(this.$route.query.type, 10);
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
  watch: {
    $route() {
      this.handleSearch();
    },
  },
  created() {
    this.handleSearch();
  },
};
</script>

<template>
  <job-listing-with-filters
    :posts="posts"
    :is-loading="isLoading"
    :has-header="true"
  >
    <h1 slot="headerText" ref="headline">
      <template v-if="company">
        <strong>{{ company }}</strong> firmasına ait
      </template>

      <template v-if="type">
        <strong>{{ jobTypeString }}</strong> çalışma tipindeki
      </template>

      <template v-if="location">
        <strong>{{ location }}</strong>
        <template v-if="location.toLowerCase() !== 'remote'">
          bölgesinde bulunan
        </template>
      </template>

      <template v-if="query">
        <strong>{{ query }}</strong> anahtar kelimesine sahip
      </template>

      <template v-if="location || query || type || company">
        ilanlar
      </template>
    </h1>
  </job-listing-with-filters>
</template>
