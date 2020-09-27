<script>
import Loader from '../Loader';
import UserItem from './UserItem';

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    users: {
      type: Array,
      required: true,
    },
    notFoundText: {
      type: String,
      required: false,
      default: 'Developer bulunamadı.',
    },
  },
  components: {
    Loader,
    UserItem,
  },
};
</script>

<template>
  <loader v-if="isLoading" />
  <ul class="resumes-list alternative" v-else-if="users.length">
    <user-item
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </ul>
  <div v-else class="notification notice">
    <p>
      <span>{{ notFoundText }}</span>
    </p>
  </div>
</template>
