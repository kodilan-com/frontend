<script>
import { mapState, mapActions } from 'vuex';
import JobListing from '../shared/JobListing';

export default {
  data() {
    return {
      isLoading: true,
      slug: null,
      posts: [],
    };
  },
  components: {
    JobListing,
  },
  computed: {
    tag() {
      return this.slug || this.$route.params.slug;
    },
  },
  methods: {
    ...mapActions(['search']),
    handleSearch() {
      this.search({ tag: this.tag })
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
  beforeRouteUpdate(to, from, next) {
    this.isLoading = true;
    this.slug = to.params.slug;
    this.handleSearch();

    next();
  },
};
</script>

<template>
  <div class="container">
    <div
      v-if="posts.length"
      class="columns sixteen">
      <h3 class="margin-bottom-25">
        <strong>{{tag}}</strong> etiketli ilanlar</h3>
      <job-listing
        :is-loading="isLoading"
        :posts="posts"
      />
    </div>
    <div
      v-else
      class="notification warning"
    >
      <p>
        <span>{{tag}}</span> etiketiyle ilgili ilan bulunamadı.
      </p>
    </div>
  </div>
</template>
