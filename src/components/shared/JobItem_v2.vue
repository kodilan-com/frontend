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
      <div class="new">
        <span class="title tag-post-link">
          {{ post.position }}
        </span>
        <job-type-badge :post="post" />
        <span class="timeago wide">
          {{ timeago }}
        </span>
      </div>
      <ul class="listing-icons">
        <li class="company">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <router-link :to="`/firmalar/${company.slug}`">
            {{ company.name }}
          </router-link>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <router-link :to="`/ilan-ara?location=${post.location}`">
            {{ post.location }}
          </router-link>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ timeago }}</span>
        </li>
      </ul>
      <ul class="listing-icons">
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
    width: 84px;
    height: 84px;
  }

  .post-tag {
    margin-right: 5px;
  }

  .listing-type {
    top: 30px;
  }

  .timeago-item {
    display: block;

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

  div.new {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;

    span.title {
      color: #000000;
      font-size: 16px;
      font-weight: 700;
      line-height: 27px;

      margin-right: 12px;
      flex-grow: 1;
    }

    .listing-type {
      position: unset;
      font-size: 12px;
      font-weight: 600;
      padding: 1px 4px 0px 4px;
      margin-right: 0px;
    }

    span.timeago.wide {
      display: none;
      position: unset;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .listing-icons li svg {
    stroke: #1D4354;
  }

  .listing-icons li span, .listing-icons li a {
    color: #1D4354;
  }

  /*&:hover {
    .listing-icons li.company svg {
      stroke: #26ae61;
    }

    .listing-icons li.company a {
        color: #26ae61;
        font-weight: 400;
    }
  }*/
}
</style>
