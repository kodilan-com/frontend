<script>
import { mapState, mapActions } from 'vuex';
import { PERIODS } from '../../store/constants';

export default {
  computed: {
    ...mapState(['activePeriod']),
  },
  methods: {
    ...mapActions(['setPeriod']),
  },
  created() {
    this.PERIODS = PERIODS;
  },
};
</script>

<template>
  <ul class="tabs-nav">
    <li
      v-for="period in PERIODS"
      :key="period.type"
      :class="{ active: activePeriod === period.type }"
    >
      <router-link :to="`/${period.slug}`">
        {{ period.text }}
      </router-link>
    </li>
  </ul>
</template>
