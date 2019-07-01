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
    <li :class="{ active: activePeriod === PERIODS.daily }">
      <a href="#" @click.prevent="setPeriod(PERIODS.daily)">Bugün</a>
    </li>
    <li :class="{ active: activePeriod === PERIODS.weekly }">
      <a href="#" @click.prevent="setPeriod(PERIODS.weekly)">Bu hafta</a>
    </li>
    <li :class="{ active: activePeriod === PERIODS.monthly }">
      <a href="#" @click.prevent="setPeriod(PERIODS.monthly)">Bu ay</a>
    </li>
  </ul>
</template>
