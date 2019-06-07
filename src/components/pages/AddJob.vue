<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import LocationSelect from '../shared/LocationSelect';
import JobDetails from './JobDetails';
import { normalizeUrl } from '../../utils/url';
import autocomplete from '../../utils/autocomplete';
import validationMixin from '../../mixins/validator';
import { defaultEditorToolbar } from '../../config';

export default {
  mixins: [validationMixin],
  components: {
    VueEditor,
    JobDetails,
    LocationSelect,
  },
  data() {
    return {
      isPreview: false,
      isSaved: false,
      isSaving: false,
      formData: {
        position: '',
        description: '',
        apply_email: '',
        apply_url: '',
        location: '',
        type: null,
        tags: '',
        company_name: '',
        company_email: '',
        company_logo: '',
        company_www: '',
        company_twitter: '',
        company_linkedin: '',
      },
      rules: {
        company_name: { required: true, message: 'Firma adı boş bırakılamaz.' },
        company_email: { required: true, message: 'E-posta adresi boş bırakılamaz.' },
        company_logo: { required: true, message: 'Logo URL boş bırakılamaz.' },
        company_www: { required: true, message: 'Website boş bırakılamaz.' },
        position: { required: true, message: 'Pozisyon boş bırakılamaz.' },
        description: { required: true, message: 'İlan açıklaması boş bırakılamaz.' },
        location: { required: true, message: 'Lokasyon boş bırakılamaz.' },
        tags: { required: true, message: 'Etiketler boş bırakılamaz.' },
      },
      type: {
        id: 1,
        text: 'Tam zamanlı',
      },
      typeOptions: [
        {
          id: 1,
          text: 'Tam zamanlı',
        },
        {
          id: 2,
          text: 'Yarı zamanlı',
        },
        {
          id: 3,
          text: 'Stajyer',
        },
        {
          id: 4,
          text: 'Freelance',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['autocompleteTags']),
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
    editorToolbar() {
      return defaultEditorToolbar;
    },
  },
  methods: {
    ...mapActions(['fetchTags', 'savePost']),
    showPreview() {
      this.formData.type = this.type.id || -1;
      if (!this.validateForm()) {
        const messages = Object.values(this.validationErrorMessages).map(e => `<li>${e}</li>`);
        const errorBody = `Lütfen aşağıdaki alanları kontrol ediniz.<ul>${messages.join('')}</ul>`;

        return this.showErrorDialog(errorBody);
      }

      return this.togglePreview();
    },
    togglePreview() {
      this.isPreview = !this.isPreview;
      window.scrollTo(0, 0);
    },
    getPostData() {
      const postData = {
        ...this.formData,
        tags: this.normalizedTags,
      };

      postData.company_twitter = (postData.company_twitter || '').replace('@', '');
      postData.company_www = normalizeUrl(postData.company_www);
      postData.apply_url = normalizeUrl(postData.apply_url);

      return postData;
    },
    save() {
      this.isSaving = true;
      this.savePost(this.getPostData())
        .then(() => {
          this.isSaved = true;
        })
        .catch((e) => {
          const errors = this.parseErrors(e);
          this.showErrorDialog(`Lütfen gerekli alanları doldurduğunuzdan emin olunuz.${errors}`);
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
    <div
      v-if="isSaved"
      class="notification success center"
    >
      <p>
        <span>İlanınız başarılı bir şekilde kaydedildi!</span><br><br>
        İlanınızın yayınlanabilmesi için gönderilen e-postadaki
        onay linkine tıklamanız gerekmektedir.
      </p>
    </div>
    <template v-else>
      <template v-if="isPreview">
        <job-details
          :preview="true"
          :preview-data="previewData"
        />
        <div class="container margin-top-40 margin-bottom-40">
          <button
            @click="togglePreview"
            class="button big back-button"
            type="button"
          >
            <i class="fa fa-arrow-left" /> Geri dön
          </button>
          <button
            @click="save"
            :disabled="isSaving"
            class="button big save-button"
            type="button"
          >
            Kaydet <i class="fa fa-check" />
          </button>
        </div>
      </template>
      <div
        v-else
        class="container"
      >
        <div class="sixteen columns">
          <div class="submit-page">
            <div class="notification notice margin-bottom-40">
              <p>
                <span>Önemli hatırlatma!</span>
                İlan ekleyebilmek için belirtmiş olduğunuz firma ismiyle uyumlu bir e-posta adresi
                vermeniz gerekiyor. İlan ekledikten sonra doğrulama işlemi için belirtmiş olduğunuz
                e-posta adresine bir onay e-postası gönderilecektir. İlanınız size gelen e-postadaki
                doğrulama linkine tıkladıktan sonra yayına alınacaktır.
              </p>
            </div>
            <div class="form">
              <h5>E-posta Adresiniz</h5>
              <input
                v-model="formData.company_email"
                class="search-field"
                type="text"
                placeholder="mail@example.com"
              >
            </div>
            <div class="form">
              <h5>Pozisyon</h5>
              <input
                v-model="formData.position"
                class="search-field"
                type="text"
              >
            </div>
            <div class="form">
              <h5>İlan Açıklaması</h5>
              <vue-editor
                v-model="formData.description"
                :editor-toolbar="editorToolbar"
              />
            </div>
            <div class="form">
              <h5>Lokasyon</h5>
              <location-select v-model="formData.location" :show-all="true" :searchable="true" />
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
                v-model="formData.tags"
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
              <input
                v-model="formData.apply_url"
                placeholder="URL"
                class="margin-bottom-10"
                type="text"
              >
              <input
                v-model="formData.apply_email"
                placeholder="E-posta"
                type="text"
              >
            </div>
            <div class="divider">
              <h3>Firma Bilgileri</h3>
            </div>
            <div class="form">
              <h5>Firma adı</h5>
              <input
                v-model="formData.company_name"
                type="text"
              >
            </div>
            <div class="form">
              <h5>Website</h5>
              <input
                v-model="formData.company_www"
                type="text"
                placeholder="https://"
              >
            </div>
            <div class="form">
              <h5>Logo URL</h5>
              <input
                v-model="formData.company_logo"
                type="text"
                placeholder="https://"
              >
              <p class="note">
                Logo kare olarak gösterilecektir.
              </p>
            </div>
            <div class="form">
              <h5>Twitter Kullanıcı adı <span>(opsiyonel)</span></h5>
              <input
                v-model="formData.company_twitter"
                type="text"
                placeholder="@twitter"
              >
            </div>
            <div class="form">
              <h5>Linkedin URL <span>(opsiyonel)</span></h5>
              <input
                v-model="formData.company_linkedin"
                type="text"
                placeholder="https://"
              >
            </div>

            <div class="button-container">
              <button
                @click="showPreview"
                class="button big margin-top-5"
                type="button"
              >
                Önizleme <i class="fa fa-arrow-circle-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
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
