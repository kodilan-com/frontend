<script>
import JobListing from '../shared/JobListing';
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
  data() {
    return {
      params: {
        query: '',
        location: '',
        type: 0,
      },
    };
  },
  components: {
    JobListing,
  },
  computed: {
    countText() {
      if (this.$route.path === '/tum-ilanlar') {
        return `Toplam ${this.posts.length} ilan bulduk.`;
      }

      return `Bu kriterlere uygun ${this.posts.length} ilan bulduk.`;
    },
  },
  methods: {
    search() {
      const params = queryUtils.getParams(this.params);

      if (params) {
        this.$router.push({ path: 'ilan-ara', query: params });
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
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
          <span>{{countText}}</span>
        </div>
      </div>
    </div>
    <div class="container job-listing">
      <div class="eleven columns">
        <div class="padding-right">
          <div class="listings-container">
            <job-listing
              :is-loading="isLoading"
              :posts="posts"
            />
          </div>
          <div class="clearfix"></div>
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
          />
          <input
            v-model="params.location"
            @keypress.enter="search"
            type="text"
            class="ico-02"
            placeholder="Şehir"
          />
          <select v-model="params.type">
            <option value="0">Çalışma tipi seçiniz...</option>
            <option value="1">Tam zamanlı</option>
            <option value="2">Yarı zamanlı</option>
            <option value="3">Stajyer</option>
            <option value="4">Freelance</option>
          </select>
        </div>
        <div class="button-right">
          <button
            @click="search"
            class="button"
          >
            Ara
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
