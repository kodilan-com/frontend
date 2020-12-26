<script>
import { mapState, mapActions } from 'vuex';
import JobListingWithFilters from '../shared/JobListingWithFilters';
import AppPaginate from '../shared/AppPaginate';

export default {
  props: {
    page: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  components: {
    AppPaginate,
    JobListingWithFilters,
  },
  data() {
    return {
      isLoading: true,
      query: {
        page: 1,
      },
    };
  },
  computed: {
    ...mapState(['allPosts', 'allPostsMeta']),
  },
  methods: {
    ...mapActions(['fetchAllPosts']),
    fetchPosts() {
      this.isLoading = true;
      this.fetchAllPosts(this.query).then(() => {
        this.isLoading = false;
      });
    },
    pageChanged() {
      this.fetchPosts();
      this.$router.push(`/ilanlar/sayfa/${this.query.page}`);
    },
  },
  created() {
    if (this.page && Number.isInteger(parseFloat(this.page))) {
      this.query.page = parseFloat(this.page);
    }
    this.fetchPosts();
  },
};
</script>

<template>
  <div>
    <job-listing-with-filters
      :is-loading="isLoading"
      :posts="allPosts"
      :meta="allPostsMeta"
    >
      <h1 slot="headerText">
        Tüm ilanlar
      </h1>

      <app-paginate slot="paginate"
                    v-show="!isLoading"
                    :meta="allPostsMeta"
                    v-model="query.page"
                    @input="pageChanged"
      />
    </job-listing-with-filters>
  </div>
</template>
