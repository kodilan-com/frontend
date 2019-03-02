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
          <button  @click="handleSearch" class="tag-search-btn">
            <i class="fa fa-search tag-search-btn" />
          </button>
          <div class="browse-jobs">
            <router-link to="/etiket/frontend" class="tag-header-tags">
              Frontend
            </router-link>
            <router-link to="/etiket/backend" class="tag-header-tags">
              Backend
            </router-link>
            <router-link to="/etiket/mobile" class="tag-header-tags">
              Mobile
            </router-link>
            <router-link to="/etiket/devops" class="tag-header-tags">
              DevOps
            </router-link>
          </div>
          <div class="browse-jobs next-line">
            <router-link to="/ilan-ara?location=istanbul" class="tag-header-tags">
              İstanbul
            </router-link>
            <router-link to="/ilan-ara?location=izmir" class="tag-header-tags">
              İzmir
            </router-link>
            <router-link to="/ilan-ara?location=ankara" class="tag-header-tags">
              Ankara
            </router-link>
            <router-link to="/ilan-ara?location=remote" class="tag-header-tags">
              Remote
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
