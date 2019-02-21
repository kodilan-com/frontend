<script>
import queryUtils from '../../utils/query';
import CountrySelect from './CountrySelect';

export default {
  components: {
    CountrySelect,
  },
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
          <country-select v-model="params.location" />
          <button @click="handleSearch">
            <i class="fa fa-search" />
          </button>
          <div class="browse-jobs">
            <router-link to="/etiket/frontend">
              Frontend
            </router-link>
            <router-link to="/etiket/backend">
              Backend
            </router-link>
            <router-link to="/etiket/mobile">
              Mobile
            </router-link>
            <router-link to="/etiket/devops">
              DevOps
            </router-link>
          </div>
          <div class="browse-jobs next-line">
            <router-link to="/ilan-ara?location=istanbul">
              İstanbul
            </router-link>
            <router-link to="/ilan-ara?location=izmir">
              İzmir
            </router-link>
            <router-link to="/ilan-ara?location=ankara">
              Ankara
            </router-link>
            <router-link to="/ilan-ara?location=remote">
              Remote
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
