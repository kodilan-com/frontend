<script>
import jobDetailMixin from '../../mixins/jobDetail.js';

export default {
  mixins: [jobDetailMixin],
};
</script>

<template>
  <span
    v-if="jobType"
    :class="postTypeClassName"
    class="listing-type"
  >
    <router-link :to="`/ilan-ara?type=${post.type}`">
      {{jobType}}
    </router-link>
  </span>
</template>
