<script>
import { mapState, mapActions } from 'vuex';
import JobItem from './JobItem';
import Loader from './Loader';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    JobItem,
    Loader,
  },
  computed: {
    ...mapState(['recentPosts']),
  },
  methods: {
    ...mapActions(['fetchRecentPosts']),
  },
  created() {
    this.fetchRecentPosts().then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<template>
  <div class="eleven columns">
    <div class="padding-right">
      <h3 class="margin-bottom-25">En Son Eklenen İlanlar</h3>
      <div class="listings-container">
        <loader v-if="isLoading" />
        <div v-else>
          <job-item
            v-for="post in recentPosts"
            :key="post.slug"
            :post="post"
          />
        </div>
      </div>
      <router-link
        to="/tum-ilanlar"
        class="button centered"
        v-if="!isLoading"
      >
        <i class="fa fa-plus-circle"></i>
        Tüm ilanları gör
      </router-link>
      <div class="margin-bottom-55"></div>
    </div>
  </div>
</template>
