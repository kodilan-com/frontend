<script>
import { mapActions } from 'vuex';
import JobListing from '../shared/JobListing';

export default {
  name: 'CompanyPosts',
  components: {
    JobListing,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['fetchByCompany']),
  },
  created() {
    this.isLoading = true;
    const company = this.$route.params.slug;

    this.fetchByCompany(company).then((res) => {
      this.posts = res.data;
      this.isLoading = false;
    });
  },
};
</script>


<template>
  <div>
    <div id="titlebar" v-if="!isLoading && posts.length">
      <div class="container" v-if="posts.length">
        <div class="sixteen columns">
          <h1>
            <strong>{{ posts[0].company.name }}</strong> firmasına ait ilanlar
          </h1>
          <span>Bu kriterlere uygun {{ posts.length }} ilan bulunuyor</span>
        </div>
      </div>
    </div>
    <div class="container">
      <job-listing
        :is-loading="isLoading"
        :posts="posts"
        not-found-text="Bu firmaya ait güncel ilan bulunamadı."
      />
    </div>
  </div>
</template>
