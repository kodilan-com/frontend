<script>
import JobTypeBadge from './JobTypeBadge';
import jobDetail from '../../mixins/jobDetail';
import image from '../../mixins/image';

export default {
  mixins: [jobDetail, image],
  components: {
    JobTypeBadge,
  },
};
</script>

<template>
  <router-link
    :to="detailsUrl"
    :class="postTypeClassName"
    class="listing tag-post-link"
  >
    <div class="listing-logo tag-post-link">
      <img
        :src="company.logo"
        :alt="company.name"
        ref="logo"
        loading="lazy"
        @error="handleImageError"
        class="tag-post-link"
      >
    </div>
    <div class="listing-title tag-post-link">
      <h4>
        <span class="title tag-post-link">
          {{ post.position }}
        </span>
        <job-type-badge :post="post" />
        <span class="timeago wide">
          {{ timeago }}
        </span>
      </h4>
      <ul class="listing-icons">
        <li>
          <i class="ln ln-icon-Management" />
          <router-link :to="`/firmalar/${company.slug}`">
            {{ company.name }}
          </router-link>
        </li>
        <li>
          <i class="ln ln-icon-Map2" />
          <router-link :to="`/ilan-ara?location=${post.location}`">
            {{ post.location }}
          </router-link>
        </li>
        <li class="timeago-item">
          <i class="ln ln-icon-Clock" />
          <span>{{ timeago }}</span>
        </li>
        <li>
          <div
            v-for="tag in post.tags"
            :key="tag.slug"
            class="listing-date post-tag tag-post-tag"
          >
            <router-link :to="`/etiket/${tag.slug}`" class="tag-post-tag">
              {{ tag.name }}
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

  .timeago-item {
    display: none;

    span {
      color: #26ae61;
    }
  }

  .timeago.wide {
    font-size: 12px;
    color: #808080;
    position: absolute;
    right: 25px;
    top: 60px;
  }
}
</style>
