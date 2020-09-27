<script>
import { mapActions } from 'vuex';
import UserListingWithFilters from '../shared/user-listing/UserListingWithFilters';
import searchPageMetaInfoMixin from '../../mixins/searchPageMetaInfo';

export default {
  mixins: [searchPageMetaInfoMixin],
  components: {
    UserListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
      users: [],
    };
  },
  computed: {
    location() {
      return this.$route.query.location;
    },
    query() {
      return this.$route.query.query;
    },
    queryString() {
      return this.$route.query;
    },
  },
  methods: {
    ...mapActions(['searchDevelopers']),
    handleSearch() {
      this.isLoading = true;

      this.searchDevelopers(this.queryString)
        .then((res) => {
          this.users = res.data;
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
  <user-listing-with-filters
    :users="users"
    :is-loading="isLoading"
  >
    <h1 slot="headerText" ref="headline">
      <template v-if="location">
        <strong>{{ location }}</strong>
        <template v-if="location.toLowerCase() !== 'remote'">
          bölgesinde bulunan
        </template>
      </template>

      <template v-if="query">
        <strong>{{ query }}</strong> anahtar kelimesine sahip
      </template>

      <template v-if="location || query">
        developerlar
      </template>
    </h1>
  </user-listing-with-filters>
</template>

<style lang="scss" scoped>
  h1 {
    text-transform: capitalize;
  }
</style>
