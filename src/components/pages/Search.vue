<script>
import { mapState, mapActions } from 'vuex';
import JobListing from '../shared/JobListing';

export default {
  data() {
    return {
      isLoading: true,
      posts: [],
    };
  },
  components: {
    JobListing,
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
  },
  methods: {
    ...mapActions(['search']),
    handleSearch() {
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
    <div
      v-if="posts.length"
      class="columns sixteen">
      <h2 class="margin-bottom-25">
        <template v-if="company">
          <strong>{{company}}</strong> firmasındaki
        </template>
        <template v-if="type">
          <strong>{{type}}</strong> tipindeki
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
        :is-loading="isLoading"
        :posts="posts"
      />
    </div>
    <div
      v-else
      class="notification warning"
    >
      <p>Bu aramaya göre ilan bulamadık.</p>
    </div>
  </div>
</template>
