<script>
import { mapState, mapActions } from 'vuex';
import api from '../services/api';
import Loader from './shared/Loader';

export default {
  components: {
    Loader,
  },
  computed: {
    ...mapState(['isLoading']),
  },
  methods: {
    ...mapActions(['setData', 'toggleLoading']),
  },
  created() {
    api.fetchData().then((data) => {
      this.setData(data);
      this.toggleLoading();
    });
  },
};
</script>

<template>
  <div>
    <loader v-if="isLoading" />
  </div>
</template>
