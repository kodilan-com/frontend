<script>
import { mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';
import searchPageMetaInfoMixin from '../../mixins/searchPageMetaInfo';
import { JOB_TYPE_MAP, JOB_TYPE_SLUG_TO_ID_MAP } from '../../store/constants';

export default {
  mixins: [searchPageMetaInfoMixin],
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
      if (this.parsedJob && !this.typeofParsedJob) {
        return this.parsedJob;
      }

      return this.$route.query.location;
    },
    query() {
      return this.$route.query.query;
    },
    queryString() {
      if (this.parsedJob) {
        return {
          ...this.$route.query,
          type: this.typeofParsedJob ? this.parsedJob : this.$route.query.type,
          location: !this.typeofParsedJob ? this.parsedJob : this.$route.query.location,
        };
      }

      return this.$route.query;
    },
    typeofParsedJob() {
      return (typeof this.parsedJob === 'number') !== false;
    },
    parsedJob() {
      if (this.$route.matched.length > 1) {
        const slug = this.$route.path.replace('/ilan-ara/', '');

        return Object.prototype.hasOwnProperty.call(JOB_TYPE_SLUG_TO_ID_MAP, slug)
          ? JOB_TYPE_SLUG_TO_ID_MAP[slug]
          : slug;
      }

      return null;
    },
    type() {
      if (this.parsedJob && this.typeofParsedJob) {
        return this.parsedJob;
      }

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

      this.search(this.queryString)
        .then((res) => {
          this.posts = res.data;
        })
        .finally(() => {
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
