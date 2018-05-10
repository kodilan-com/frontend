<script>
import { mapState, mapActions } from 'vuex';
import JobListing from '../shared/JobListing';
import queryUtils from '../../utils/query';

export default {
  data() {
    return {
      isLoading: true,
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
    ...mapState(['allPosts']),
  },
  methods: {
    ...mapActions(['fetchAllPosts']),
    search() {
      const params = queryUtils.getParams(this.params);

      if (params) {
        this.$router.push({ path: 'ilan-ara', query: params });
      }
    },
  },
  created() {
    this.fetchAllPosts().then(() => {
      this.isLoading = false;
    });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<template>
  <div class="container">
    <div class="eleven columns">
      <div class="padding-right">
        <div class="listings-container">
          <job-listing
            :is-loading="isLoading"
            :posts="allPosts"
          />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="five columns">
      <div class="widget">
        <h4>İlan arama</h4>
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
</template>
