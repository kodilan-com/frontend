<script>
import Loader from './Loader';
import JobItem from './JobItem_v2';

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
    notFoundText: {
      type: String,
      required: false,
      default: 'İlan bulunamadı.',
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
    <template v-else>
      <div v-if="posts.length">
        <job-item
          v-for="post in posts"
          :key="post.slug"
          :post="post"
        />
      </div>
      <div v-else class="notification notice">
        <p>
          <span>{{ notFoundText }}</span>
        </p>
      </div>
    </template>
  </div>
</template>
