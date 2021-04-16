<script>
import queryUtils from '../../utils/query';
import LocationSelect from './LocationSelect';

export default {
  components: {
    LocationSelect,
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
          <h2>Hey 👋 senin için burada 1322 ilan var</h2>
          <h3>Yeteneklerine göre bu ilanları aşağıdan filtreleyebilirsin.</h3>
          <div class="inputs">
            <input
              v-model="params.query"
              @keypress.enter="handleSearch"
              type="text"
              class="ico-01 flat"
              placeholder="Pozisyon adı, teknoloji adı"
            >
            <div class="semi-border" />
            <div class="banner--location-select">
              <location-select
                v-model="params.location"
                :value="params.location"
                :searchable="true"
              />
            </div>
            <button @click="handleSearch" class="tag-search-btn">
              <i class="fa fa-search tag-search-btn" />
            </button>
          </div>
          <div class="clearfix" />
          <div class="common-jobs">
            <div class="browse-jobs">
              <h5>Öne çıkan yetenekler</h5>
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
              <h5>Öne çıkan şehirler</h5>
              <router-link to="/ilan-ara?location=istanbul" class="tag-header-tags">
                İstanbul
              </router-link>
              <router-link to="/ilan-ara?location=izmir" class="tag-header-tags">
                İzmir
              </router-link>
              <router-link to="/ilan-ara?location=ankara" class="tag-header-tags">
                Ankara
              </router-link>
              <router-link to="/ilan-ara?location=Remote" class="tag-header-tags">
                Remote
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .banner {
    background: none;
  }

  .search-container {

    h2 {
      margin-bottom: 12px;
      line-height: 100%;
    }

    h3 {
      line-height: 100%;
      margin-bottom: 32px;
      color: #26ae61;
    }

    h5 {
      color: #26ae61;
      line-height: 100%;
      margin-bottom: 16px;
    }

    .common-jobs {
      margin-top: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .browse-jobs a {
        padding: 0px 12px;
        margin-right: 8px;

        &:last-child { margin-right: 0px; }

        &:hover {
          border-color: transparent;
          color: #FFF;
          background-color: #26ae61;
          box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
        }
      }

      .browse-jobs.next-line h5 {
        text-align: right;
      }
    }

    .inputs {
      padding: 8px 8px 8px 8px;
      background-color: #fff;
      box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);

      * { border-radius: 0; }

      .ico-01 {
        border-right: 1px solid #e0e0e0;
        color: #000;

        &::placeholder {
          color: #A6A8AF;
        }
      }

    }
  }

</style>
