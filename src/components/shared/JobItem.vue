<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postTypeClassName() {
      return {
        'full-time': true,
      };
    },
    detailsUrl() {
      return `/ilan-detay/${this.post.slug}`;
    },
    company() {
      return this.post.company;
    },
  },
};
</script>

<template>
  <router-link
    :to="detailsUrl"
    :class="postTypeClassName"
    class="listing"
  >
    <div class="listing-logo">
      <img
        :src="company.logo"
        :alt="company.name"
      />
    </div>
    <div class="listing-title">
      <h4>
        {{post.position}}
        <span class="listing-type">Full-Time</span>
      </h4>
      <ul class="listing-icons">
        <li>
          <i class="ln ln-icon-Management"></i> {{company.name}}
        </li>
        <li>
          <i class="ln ln-icon-Map2"></i> {{post.location}}
        </li>
        <li>
          <div class="listing-date new">new</div>
        </li>
      </ul>
    </div>
  </router-link>
</template>

<style lang="scss">
.listing {
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
