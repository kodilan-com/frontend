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
  <section>
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
    <div class="ul tabs-nav is-right">
      <li class="active">
        <router-link to="/ilanlar">
          <i class="fa fa-plus-circle" />
          Tüm İlanları Gör
        </router-link>
      </li>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  section {
    @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;
    }
    .tabs-nav {
      width: auto;
      @media (max-width: 767px) {
        display: flex;
        margin-bottom: 8px;
        li {
          float: none;
          flex: 1;
          text-align: center;
          line-height: 40px;
          a {
            padding: 0 12px;
            font-size: 12px;
          }
        }
      }
      @media (max-width: 359px) {
        li a {
          padding: 0 10px;
        }
      }
      &.is-right li a {
        border-radius: 3px;
      }
    }
  }
</style>
