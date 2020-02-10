<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import LocationSelect from '../shared/LocationSelect';
import { normalizeUrl } from '../../utils/url';
import autocomplete from '../../utils/autocomplete';
import validationMixin from '../../mixins/validator';
import { defaultEditorToolbar } from '../../config';
import { JOB_TYPES_FOR_DROPDOWN } from '../../store/constants';

export default {
  components: {
    VueEditor,
    LocationSelect,
  },
  data(){
    return {
      postDetail: {},
      type: JOB_TYPES_FOR_DROPDOWN[0],
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  methods: {
    ...mapActions(['fetchPostDetail', 'fetchTags']),
  },
  mounted() {
    this.$store.dispatch('fetchPostDetail')
    .then(res => {this.postDetail = res.data.data[0]})
    .catch(error => console.log(error.response.data))
    
    this.fetchTags()
      .then(() => {
        autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
      });
  },
  computed: {
    ...mapGetters(['autocompleteTags', 'companyId']),
    normalizedTags() {
      return this.postDetail.tags
        .split(',')
        .filter(tag => tag.trim().length)
        .map(tag => tag.trim().toLowerCase().replace(/ /g, '-'));
    },
    previewData() {
      const tagsArr = this.normalizedTags.map(t => ({ name: t, slug: t }));
      const company = Object.keys(this.postDetail).reduce((acc, key) => {
        if (key.indexOf('company_') > -1) {
          acc.company[key.replace('company_', '')] = this.postDetail[key];
        }

        return acc;
      }, { company: {} });

      return {
        ...this.postDetail,
        ...company,
        tags: tagsArr,
      };
    },
    editorToolbar() {
      return defaultEditorToolbar;
    },
  },
}
</script>

<template>
  <div class="add-job">
    <div
      id="titlebar"
      class="single submit-page"
    >
      <div class="container">
        <div class="sixteen columns">
          <h1>
            <i class="fa fa-plus-circle" /> İlanı Düzenle
          </h1>
        </div>
      </div>
    </div>
    <div
      class="container"
    >
      <div class="sixteen columns">
        <div class="submit-page">
          <div class="form">
            <h5>Pozisyon</h5>
            <input v-model="this.postDetail.position" class="search-field" type="text">
          </div>
          <div class="form">
            <h5>İlan Açıklaması</h5>
            <vue-editor v-model="this.postDetail.description" :editor-toolbar="editorToolbar" />
          </div>
          <div class="form">
            <h5>Lokasyon</h5>
            <location-select
              v-model="this.postDetail.location"
              :value="this.postDetail.location"
              :show-all="true"
              :searchable="true"
            />
            <p class="note">
              Uzaktan çalışmaya elverişli bir ilansa Remote seçiniz.
            </p>
          </div>
          <div class="form">
            <h5>İlan Tipi</h5>
            <multiselect
              v-model="type"
              :options="typeOptions"
              label="text"
              :searchable="false"
              :close-on-select="true"
              placeholder="Seçiniz..."
            />
          </div>
          <div class="form">
            <h5>Etiketler</h5>
            <input
              v-model="this.postDetail.tags"
              ref="tagsInput"
              class="tags-input"
              type="text"
              data-multiple
            >
            <p class="note">
              Bu pozisyon için gerekli olan yeti ve teknolojileri listeden seçebilirsiniz
              ya da virgul ile ekleme yapabilirsiniz. En fazla 10 etiket ekleyebilirsiniz.
              <br>
              İlanınıza <code>frontend</code>, <code>backend</code>, <code>mobile</code>,
              <code>designer</code>, <code>qa</code> etiketlerinden birini ekleyip
              ilgili kategoride yer almasını sağlayabilirsiniz.
              <br>
              Doğru ve etkili etiketler seçmek ilanınızın ilan detay sayfasındaki
              "Benzer İlanlar" arasında gözükme şansını arttıracaktır.
            </p>
          </div>
          <div class="form">
            <h5>Başvuru bilgileri</h5>
            <input v-model="this.postDetail.apply_email" placeholder="E-posta" type="text">
          </div>
          <div class="button-container">
            <button class="button big margin-top-5" type="button">
              Güncelle <i class="fa fa-arrow-circle-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.add-job {
  .button-container {
    text-align: right;
  }

  .awesomplete {
    width: 100%;
  }

  .back-button {
    background: #282828;
  }

  .save-button {
    position: absolute;
    right: 0;
  }

  code {
    font-family: monospace;
    padding: 2px 4px;
    color: #c0341d;
    background-color: #fbe5e1;
    border-radius: 4px;
  }
}
</style>
