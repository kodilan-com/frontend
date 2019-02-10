<script>
import queryUtils from '../../utils/query';

export default {
  data() {
    return {
      params: {
        query: '',
        location: '',
      },
    };
  },
  methods: {
    handleSearch() {
      const params = queryUtils.getParams(this.params);

      if (params) {
        this.$router.push({ path: 'ilan-ara', query: params });
      }
    },
  },
};
</script>

<template>
  <div id="banner">
    <div class="container">
      <div class="sixteen columns">
        <div class="search-container">
          <h2>İlan Ara</h2>
          <input
            v-model="params.query"
            @keypress.enter="handleSearch"
            type="text"
            class="ico-01"
            placeholder="Pozisyon adı, teknoloji adı"
          >
          <input
            v-model="params.location"
            @keypress.enter="handleSearch"
            type="text"
            class="ico-02"
            placeholder="Şehir"
          >
          <button @click="handleSearch">
            <i class="fa fa-search" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
