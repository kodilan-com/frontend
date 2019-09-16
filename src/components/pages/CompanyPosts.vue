<script>
import { mapActions } from 'vuex';
import image from '../../mixins/image';
import JobListing from '../shared/JobListing';
import companyPostsMetaInfoMixin from '../../mixins/companyPostsMetaInfo';

export default {
  name: 'CompanyPosts',
  mixins: [companyPostsMetaInfoMixin, image],
  components: {
    JobListing,
  },
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(['fetchByCompany']),
  },
  created() {
    this.isLoading = true;
    const company = this.$route.params.slug;

    this.fetchByCompany(company).then(({ data }) => {
      this.posts = data;
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
