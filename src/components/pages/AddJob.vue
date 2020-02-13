<script>
import { mapGetters, mapActions } from 'vuex';
import autocomplete from '../../utils/autocomplete';
import validationMixin from '../../mixins/validator';
import JobDetails from './JobDetails';
import { JOB_TYPES_FOR_DROPDOWN } from '../../store/constants';
import AdvertForm from './AdvertForm';

export default {
  mixins: [validationMixin],
  components: {
    AdvertForm,
    JobDetails,
  },
  data() {
    return {
      isPreview: false,
      isSaving: false,
      formData: {
        position: '',
        description: '',
        apply_email: '',
        location: '',
        type: null,
        tags: '',
      },
      rules: {
        position: { required: true, message: 'Pozisyon boş bırakılamaz.' },
        description: { required: true, message: 'İlan açıklaması boş bırakılamaz.' },
        location: { required: true, message: 'Lokasyon boş bırakılamaz.' },
        tags: { required: true, message: 'Etiketler boş bırakılamaz.' },
      },
      type: JOB_TYPES_FOR_DROPDOWN[0],
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  computed: {
    ...mapGetters(['autocompleteTags', 'companyId']),
    normalizedTags() {
      return this.formData.tags
        .split(',')
        .filter(tag => tag.trim().length)
        .map(tag => tag.trim().toLowerCase().replace(/ /g, '-'));
    },
    previewData() {
      const tagsArr = this.normalizedTags.map(t => ({ name: t, slug: t }));
      const company = Object.keys(this.formData).reduce((acc, key) => {
        if (key.indexOf('company_') > -1) {
          acc.company[key.replace('company_', '')] = this.formData[key];
        }

        return acc;
      }, { company: {} });

      return {
        ...this.formData,
        ...company,
        tags: tagsArr,
      };
    },
  },
  methods: {
    ...mapActions(['fetchTags', 'savePost']),
    showPreview() {
      if (!this.validateForm()) {
        const messages = Object.values(this.validationErrorMessages).map(e => `<li>${e}</li>`);
        const errorBody = `Lütfen aşağıdaki alanları kontrol ediniz.<ul>${messages.join('')}</ul>`;

        return this.showErrorDialog(errorBody);
      }

      this.formData.type = this.type.id || -1;

      return this.togglePreview();
    },
    togglePreview() {
      this.isPreview = !this.isPreview;
      window.scrollTo(0, 0);
    },
    getPostData() {
      return {
        ...this.formData,
        company_id: this.companyId,
        // tags: this.normalizedTags,
        tags: [56, 64, 33, 46], // FIXME
      };
    },
    save() {
      this.isSaving = true;

      console.log(this.getPostData());
      this.savePost(this.getPostData())
        .then(() => {
          this.$router.push('/ilan-ekle/basarili');
        })
        .catch((e) => {
          const errors = this.parseErrors(e);
          this.showErrorDialog(`Lütfen gerekli alanları doldurduğunuzdan emin olunuz.${errors}`);
          console.log(e.response.data);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    showErrorDialog(text) {
      const subject = encodeURI('İlan Eklerken Hata');

      this.$modal.show('dialog', {
        text,
        title: 'İlan ekleme başarısız!',
        buttons: [
          { title: `<a href="mailto:info@kodilan.com?subject=${subject}" >Hata bildir!</a>` },
          { title: 'Kapat' },
        ],
      });
    },
    parseErrors(e) {
      const errors = e.response.data.errors || [];
      const details = Object.values(errors)
        .reduce((arr, err) => arr.concat(err), [])
        .map(err => `<li>${err}</li>`);

      return `<ul>${details.join('')}</ul>`;
    },
  },
  mounted() {
    this.fetchTags()
      .then(() => {
        autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
      });
  },
};
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
            <i class="fa fa-plus-circle" /> Yeni İlan Ekle
          </h1>
        </div>
      </div>
    </div>
    <template v-if="isPreview">
      <job-details
        :preview="true"
        :preview-data="previewData"
      />
      <div class="container margin-top-40 margin-bottom-40">
        <button @click="togglePreview" class="button big back-button" type="button">
          <i class="fa fa-arrow-left" /> Geri dön
        </button>
        <button @click="save" :disabled="isSaving" class="button big save-button" type="button">
          Kaydet <i class="fa fa-check" />
        </button>
      </div>
    </template>
    <template v-else>
      <advert-form :formData = this.formData />
    </template>
    <div class="container button-container">
      <button @click="showPreview" class="button big margin-top-5" type="button">
        Önizleme <i class="fa fa-arrow-circle-right" />
      </button>
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
