<script>
export default {
  data() {
    return {
      query: '',
      location: '',
    };
  },
  methods: {
    handleSearch() {
      const { query, location } = this;
      const params = {};

      if (!query && !location) {
        return;
      }

      if (query) {
        params.query = query;
      }

      if (location) {
        params.location = location;
      }

      this.$router.push({ path: 'ilan-ara', query: params });
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
            v-model="query"
            @keypress.enter="handleSearch"
            type="text"
            class="ico-01"
            placeholder="pozisyon adı, şirket adı, teknoloji adı"
          />
          <input
            v-model="location"
            @keypress.enter="handleSearch"
            type="text"
            class="ico-02"
            placeholder="şehir"
          />
          <button @click="handleSearch">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
