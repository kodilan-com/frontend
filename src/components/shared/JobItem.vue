<script>
import formatDate from '../../utils/date';

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
    timeago() {
      return formatDate(this.post.created_at);
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
        <span class="timeago">{{timeago}}</span>
      </h4>
      <ul class="listing-icons">
        <li>
          <i class="ln ln-icon-Management"></i> {{company.name}}
        </li>
        <li>
          <i class="ln ln-icon-Map2"></i> {{post.location}}
        </li>
        <li>
          <div
            v-for="tag in post.tags"
            :key="tag.slug"
            class="listing-date post-tag"
          >
            <router-link
              :to="`/etiket/${tag.slug}`"
            >
              {{tag.name}}
            </router-link>
          </div>
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

  .post-tag {
    margin-right: 5px;
  }

  .listing-type {
    top: 30px;
  }

  .timeago {
    font-size: 12px;
    color: #808080;
    position: absolute;
    right: 25px;
    top: 60px;
  }
}
</style>
