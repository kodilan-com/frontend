<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      post: {
        position: '',
        description: '',
        location: '',
        applyUrl: '',
        company: {
          name: '',
          email: '',
          logo: '',
          twitter: '',
        },
        tags: '',
      },
    };
  },
  created() {
    this.findPostById(this.$route.params.id).then((data) => {
      this.post = data;
      console.log(data);
      this.toggleLoading();
    });
  },
  methods: {
    ...mapActions(['findPostById', 'toggleLoading']),
  },
};
</script>

<template>
  <div>
    <div class="tile tile-centered">
      <div class="tile-icon">
        <figure class="avatar avatar-lg">
          <img
            :src="post.company.logo"
            :alt="post.company.name"
          />
        </figure>
      </div>
      <div class="tile-content">
        <p class="tile-title">{{post.position}}</p>
        <p class="tile-subtitle text-gray">
          <router-link :to="`companies/${post.company.name}`">
            {{post.company.name}}
          </router-link>
        </p>

      </div>
      <div class="tile-action">
        <a
          :href="post.applyUrl"
          class="btn btn-primary btn-sm"
          target="_blank"
        >
          Başvur
        </a>
      </div>
    </div>

    <p>
        {{post.description}}
    </p>
  </div>
</template>
