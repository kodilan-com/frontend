<script>
import JobListing from './JobListing';
import LocationSelect from './LocationSelect';
import queryUtils from '../../utils/query';

export default {
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
  components: {
    JobListing,
    LocationSelect,
  },
  data() {
    return {
      params: {
        query: this.$route.query.query || '',
        location: this.$route.query.location || '',
        type: this.$route.query.type || 0,
      },
      type: null,
      typeOptions: [
        {
          id: 1,
          text: 'Tam zamanlı',
        },
        {
          id: 2,
          text: 'Yarı zamanlı',
        },
        {
          id: 3,
          text: 'Stajyer',
        },
        {
          id: 4,
          text: 'Freelance',
        },
      ],
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
      this.params.type = this.type ? this.type.id : 0;

      const params = queryUtils.getParams(this.params);

      if (params) {
        this.$router.push({ path: '/ilan-ara', query: params });
      }
    },
  },
  created() {
    const type = parseInt(this.$route.query.type, 10);
    if (type) {
      this.type = {
        id: type,
        text: this.typeOptions.find(o => o.id === type).text,
      };
    }
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
    <div class="container job-listing" :class="{ empty: !posts.length }">
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
          <location-select
            v-model="params.location"
          />
          <multiselect
            v-model="type"
            :options="typeOptions"
            label="text"
            :searchable="false"
            :close-on-select="true"
            placeholder="Çalışma tipi seçiniz..."
          />
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
