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
    detailsUrl() {
      return `/ilan-detay/${this.post.slug}`;
    },
    company() {
      return this.post.company;
    },
    timeago() {
      return formatDate(this.post.created_at);
    },
    jobType() {
      const TYPE_MAP = {
        0: 'Tam zamanlı',
        1: 'Tam zamanlı',
        2: 'Yarı zamanlı',
        3: 'Stajyer',
        4: 'Freelance',
      };

      return TYPE_MAP[this.post.type] || '';
    },
    postTypeClassName() {
      const CLASS_MAP = {
        0: 'full-time',
        1: 'full-time',
        2: 'part-time',
        3: 'internship',
        4: 'freelance',
      };

      return {
        [CLASS_MAP[this.post.type]]: true,
      };
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
        <span
          v-if="jobType"
          class="listing-type"
        >
          <router-link :to="`/ilan-ara?type=${post.type}`">
            {{jobType}}
          </router-link>
        </span>
        <span class="timeago">{{timeago}}</span>
      </h4>
      <ul class="listing-icons">
        <li>
          <i class="ln ln-icon-Management"></i>
          <router-link :to="`/ilan-ara?company=${company.slug}`">{{company.name}}</router-link>
        </li>
        <li>
          <i class="ln ln-icon-Map2"></i>
          <router-link :to="`/ilan-ara?location=${post.location}`">{{post.location}}</router-link>
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
