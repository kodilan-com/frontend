<script>
import Loader from './Loader';
import JobItem from './JobItem';

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
    },
  },
  components: {
    Loader,
    JobItem,
  },
};
</script>

<template>
  <div class="listings-container">
    <loader v-if="isLoading" />
    <div v-else>
      <job-item
        v-for="post in posts"
        :key="post.slug"
        :post="post"
      />
    </div>
  </div>
</template>
