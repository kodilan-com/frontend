<script>
import JobListing from './JobListing';
import CountrySelect from './CountrySelect';
import queryUtils from '../../utils/query';

export default {
  components: {
    JobListing,
    CountrySelect,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      params: {
        query: this.$route.query.query || '',
        location: this.$route.query.location || '',
        type: this.$route.query.type || 0,
      },
    };
  },
  computed: {
    countText() {
      const { length } = this.posts;

      if (!length) {
        return 'Bu kritere uygun ilan bulunamadı.';
      }

      const prefix = this.$route.path === '/ilanlar' ? 'Toplam' : 'Bu kriterlere uygun';

      return `${prefix} ${length} ilan bulunuyor`;
    },
  },
  methods: {
    search() {
      const params = queryUtils.getParams(this.params);

      if (params) {
        this.$router.push({ path: '/ilan-ara', query: params });
      }
    },
  },
};
</script>

<template>
  <section id="page">
    <div
      v-if="!isLoading"
      id="titlebar"
    >
      <div class="container">
        <div class="sixteen columns">
          <slot name="headerText" />
          <span>{{ countText }}</span>
        </div>
      </div>
    </div>
    <div class="container job-listing">
      <div class="eleven columns">
        <div class="padding-right">
          <job-listing
            :is-loading="isLoading"
            :posts="posts"
          />
        </div>
      </div>
      <div
        v-if="!isLoading"
        class="five columns"
      >
        <div class="widget">
          <input
            v-model="params.query"
            @keypress.enter="search"
            type="text"
            class="ico-01"
            placeholder="Pozisyon adı, teknoloji adı"
          >
          <country-select
            v-model="params.location"
          />
          <select v-model="params.type">
            <option value="0">
              Çalışma tipi seçiniz...
            </option>
            <option value="1">
              Tam zamanlı
            </option>
            <option value="2">
              Yarı zamanlı
            </option>
            <option value="3">
              Stajyer
            </option>
            <option value="4">
              Freelance
            </option>
          </select>
        </div>
        <div class="button-right">
          <button
            @click="search"
            class="button tag-search-btn"
          >
            Ara
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
