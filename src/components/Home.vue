<script>
import { mapState, mapActions } from 'vuex';
import Loader from './shared/Loader';
import Post from './shared/Post';

export default {
  components: {
    Loader,
    Post,
  },
  computed: {
    ...mapState(['isLoading', 'posts']),
  },
  methods: {
    ...mapActions(['fetchData', 'setData', 'toggleLoading']),
  },
  created() {
    this.fetchData().then(() => {
      this.toggleLoading();
    });
  },
};
</script>

<template>
  <div class="app-container container">
    <router-link
      class="btn btn-primary btn-lg"
      to="/ilan-ekle"
    >
      İLAN EKLE
    </router-link>
    <div class="columns">
      <loader v-if="isLoading" />
      <div
        class="column col-12"
        v-else
      >
        <post
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  max-width: 1024px;
}
</style>
