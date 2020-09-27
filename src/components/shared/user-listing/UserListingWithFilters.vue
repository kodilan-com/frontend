<script>
import { mapActions, mapState } from 'vuex';
import UserListing from './UserListing';
import LocationSelect from '../LocationSelect';
import queryUtils from '../../../utils/query';

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    UserListing,
    LocationSelect,
  },
  data() {
    return {
      location: null,
      params: {
        query: this.$route.query.query || '',
        location: this.$route.query.location || '',
      },
    };
  },
  computed: {
    ...mapState(['locationList']),
    countText() {
      const length = this.meta && this.meta.total ? this.meta.total : this.users.length;

      if (!length) {
        return 'Bu kritere uygun developer bulunamadı.';
      }

      const prefix = this.$route.path === '/ilanlar' ? 'Toplam' : 'Bu kriterlere uygun';

      return `${prefix} ${length} developer bulunuyor`;
    },
  },
  methods: {
    ...mapActions(['fetchAllLocations']),
    search() {
      const params = queryUtils.getParams({
        ...this.params,
        location: this.location,
      });

      if (params) {
        this.$router.push({ path: '/developer-ara', query: params });
      }
    },
  },
  created() {
    this.fetchAllLocations().then((response) => {
      let location = null;

      response.data.list.forEach((value) => {
        if (value.name === this.$route.query.location) {
          location = value;
        }
      });

      this.location = location;
    });
  },
};
</script>

<template>
  <section id="page">
    <div v-if="!isLoading" id="titlebar">
      <div class="container">
        <div class="sixteen columns">
          <slot name="headerText" />
          <span>{{ countText }}</span>
        </div>
      </div>
    </div>
    <div class="container" :class="{ empty: !users.length }">
      <div class="eleven columns">
        <div class="padding-right">
          <user-listing :is-loading="isLoading"
                        :users="users"
          />
          <slot name="paginate" />
        </div>
      </div>
      <div v-if="!isLoading" class="five columns">
        <div class="widget">
          <input
            v-model="params.query"
            @keypress.enter="search"
            type="text"
            class="ico-01"
            placeholder="Pozisyon adı, teknoloji adı"
          >
          <location-select v-model="location" :value="location" :searchable="true" />
        </div>
        <div class="button-right">
          <button @click="search" class="button tag-search-btn">
            Ara
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
