<script>
import { mapActions, mapState } from 'vuex';
import UserListingWithFilters from '../shared/user-listing/UserListingWithFilters';
import searchPageMetaInfoMixin from '../../mixins/searchPageMetaInfo';
import AppPaginate from '../shared/AppPaginate';

export default {
  mixins: [searchPageMetaInfoMixin],
  components: {
    AppPaginate,
    UserListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
      users: [],
      query: {
        page: 1,
        query: this.$route.query.query,
      },
    };
  },
  computed: {
    ...mapState(['developerSearchMeta']),
    location() {
      return this.$route.query.location;
    },
    queryString() {
      return this.$route.query.query;
    },
  },
  methods: {
    ...mapActions(['searchDevelopers']),
    handleSearch() {
      this.isLoading = true;
      this.query.query = this.$route.query.query;

      this.searchDevelopers(this.query)
        .then((response) => {
          this.users = response;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    pageChanged() {
      this.handleSearch();
      this.$router.push(`/developer-ara?page=${this.query.page}`);
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
    :meta="developerSearchMeta"
  >
    <h1 slot="headerText" ref="headline">
      <template v-if="!location && !query.query">
        Tüm
      </template>
      <template v-if="location">
        <strong>{{ location }}</strong>
        <template v-if="location.toLowerCase() !== 'remote'">
          bölgesinde bulunan
        </template>
      </template>

      <template v-if="query.query">
        <strong>{{ query.query }}</strong> anahtar kelimesine sahip
      </template>

      <template v-if="location || query">
        developerlar
      </template>
    </h1>

    <app-paginate slot="paginate"
                  v-if="developerSearchMeta"
                  v-show="!isLoading"
                  :meta="developerSearchMeta"
                  v-model="query.page"
                  @input="pageChanged"
    />
  </user-listing-with-filters>
</template>

<style lang="scss" scoped>
  h1 {
    text-transform: capitalize;
  }
</style>
