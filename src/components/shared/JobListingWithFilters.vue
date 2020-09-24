<script>
import { mapActions, mapState } from 'vuex';
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
      location: null,
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
    ...mapState(['locationList']),
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
    ...mapActions(['fetchAllLocations']),
    search() {
      this.params.type = this.type ? this.type.id : 0;

      const params = queryUtils.getParams({
        ...this.params,
        location: this.location,
      });

      if (params) {
        this.$router.push({ path: '/ilan-ara', query: params });
      }
    },
  },
  created() {
    this.fetchAllLocations().then((response) => {
      let location = null;

      response.data.list.forEach((value) => {
        if (value.name === this.$route.query.location) {
          location = value;
        }
      });

      this.location = location;
    });

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
        <div class="widget">
          <input
            v-model="params.query"
            @keypress.enter="search"
            type="text"
            class="ico-01"
            placeholder="Pozisyon adı, teknoloji adı"
          >
          <location-select v-model="location" :value="location" :searchable="true" />
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
  </section>
</template>
