<script>
import jobDetailMixin from '../../mixins/jobDetail';
import { JOB_TYPE_ID_TO_SLUG_MAP } from '../../store/constants';

export default {
  mixins: [jobDetailMixin],
  computed: {
    postTypeLink() {
      return `/ilan-ara/${JOB_TYPE_ID_TO_SLUG_MAP[this.post.type]}`;
    },
  },
};
</script>

<template>
  <span
    v-if="jobType"
    :class="postTypeClassName"
    class="listing-type tag-post-type"
  >
    <router-link :to="postTypeLink" class="tag-post-type" itemprop="employmentType">
      {{ jobType }}
    </router-link>
  </span>
</template>
