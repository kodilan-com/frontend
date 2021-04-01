<script>
import JobListing from './JobListing';
import LocationSelect from './LocationSelect';
import queryUtils from '../../utils/query';
import { JOB_TYPES_FOR_DROPDOWN } from '../../store/constants';

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      required: false,
      default: () => ({}),
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
        type: this.$route.query.type || 1,
      },
      type: null,
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  computed: {
    countText() {
      const length = this.meta && this.meta.total ? this.meta.total : this.posts.length;

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
    <div v-if="!isLoading" id="titlebar">
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
          <job-listing :is-loading="isLoading"
                       :posts="posts"
          />
          <slot name="paginate" />
        </div>
      </div>
      <div v-if="!isLoading" class="five columns">
        <h3>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Farklı ilanlar arayın
        </h3>
        <div class="searchform-wrapper">
          <div class="widget">
            <input
              v-model="params.query"
              @keypress.enter="search"
              type="text"
              class="ico-01"
              placeholder="Pozisyon adı, teknoloji adı"
            >
            <location-select v-model="params.location" :value="params.location" :searchable="true" />
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
            <button @click="search" class="button tag-search-btn">
              Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .five.columns {
    .searchform-wrapper {
      margin-top: 24px;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #FFF;
      padding: 12px 24px 24px 24px;
      box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
    }
  }

  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 500;

    svg {
      width: 24px;
      height: 24px;
      background-color: #26ae61;
      stroke: #FFF;
      margin-right: 12px;
      padding: 8px;
      border-radius: 50%;
    }
  }

</style>
