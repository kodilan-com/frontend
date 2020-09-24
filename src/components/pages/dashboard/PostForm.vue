<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import LocationSelect from '../../shared/LocationSelect';
import JobDetails from '../JobDetails';
import { normalizeUrl } from '../../../utils/url';
import autocomplete from '../../../utils/autocomplete';
import validationMixin from '../../../mixins/validator';
import { defaultEditorToolbar } from '../../../config';
import { JOB_TYPES_FOR_DROPDOWN } from '../../../store/constants';
import Loader from '../../shared/Loader';

export default {
  mixins: [validationMixin],
  components: {
    VueEditor,
    JobDetails,
    Loader,
    LocationSelect,
  },
  data() {
    return {
      isPreview: false,
      isSaving: false,
      available: undefined,
      postId: null,
      formData: {
        position: '',
        description: '',
        apply_email: '',
        apply_url: '',
        location: null,
        type: null,
        tags: '',
        company_id: '',
      },
      rules: {
        company: { required: true, message: 'Firma adı boş bırakılamaz.' },
        position: { required: true, message: 'Pozisyon boş bırakılamaz.' },
        description: { required: true, message: 'İlan açıklaması boş bırakılamaz.' },
        location: { required: true, message: 'Lokasyon boş bırakılamaz.' },
        tags: { required: true, message: 'Etiketler boş bırakılamaz.' },
      },
      type: JOB_TYPES_FOR_DROPDOWN[0],
      typeDisabled: false,
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  computed: {
    ...mapGetters(['autocompleteTags', 'companies']),
    normalizedTags() {
      return this.formData.tags
        .split(',')
        .filter(tag => tag.trim().length)
        .map(tag => tag.trim());
    },
    previewData() {
      const tagsArr = this.normalizedTags.map(t => ({ name: t, slug: t }));
      const { company } = this.formData;

      return {
        ...this.formData,
        ...company,
        tags: tagsArr,
      };
    },
    editorToolbar() {
      return defaultEditorToolbar;
    },
    companyList() {
      const list = [];

      this.companies.forEach((company) => {
        list.push({
          id: company.id,
          text: company.name,
        });
      });

      return list;
    },
  },
  methods: {
    ...mapActions([
      'fetchTags',
      'getCreatePostAvailability',
      'getPost',
      'savePost',
    ]),
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

      if (this.isPreview) {
        document.querySelector('#dashboard').classList.add('hide-nav');
      } else {
        document.querySelector('#dashboard').classList.remove('hide-nav');
      }
      window.scrollTo(0, 0);
    },
    getPostData() {
      const postData = {
        ...this.formData,
        tags: this.normalizedTags,
        company_id: this.formData.company.id,
        location_id: this.formData.location.id,
        type: this.type.id,
      };

      if (this.postId !== null) {
        postData.postId = this.postId;
      }

      delete postData.company;

      // postData.company_twitter = (postData.company_twitter || '').replace('@', '');
      postData.apply_url = normalizeUrl(postData.apply_url);

      return postData;
    },
    save() {
      this.isSaving = true;
      this.savePost(this.getPostData())
        .then(() => {
          this.saveToLocalStorage();
          if (this.postId === null) {
            this.$router.push('/hesabim/ilanlarim/ekle/basarili');
          } else {
            this.$router.push('/hesabim/ilanlarim');
          }
          document.querySelector('#dashboard').classList.remove('hide-nav');
        })
        .catch((e) => {
          const errors = this.parseErrors(e);

          if (e.response.status === 402) {
            return this.showErrorDialog(`Pakedinizdeki haklarınızı kullandınız.${errors}`);
          }

          return this.showErrorDialog(`Lütfen gerekli alanları doldurduğunuzdan emin \
            olunuz.${errors}`);
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
      if (e.response.status === 402) {
        return `<p>Yükseltmek için <a href="/paketler?company_id=${this.formData.company_id}">\
        tıklayın</a>.</p>`;
      }
      const errors = e.response.data.errors || [];
      const details = Object.values(errors)
        .reduce((arr, err) => arr.concat(err), [])
        .map(err => `<li>${err}</li>`);

      return `<ul>${details.join('')}</ul>`;
    },
    saveToLocalStorage() {
      // const postData = this.getPostData();
      // const storageData = {
      //   company_name: postData.company_name,
      //   company_email: postData.company_email,
      //   company_logo: postData.company_logo,
      //   company_www: postData.company_www,
      //   company_twitter: postData.company_twitter,
      //   company_linkedin: postData.company_linkedin,
      // };
      // localStorage.setItem('listingData', JSON.stringify(storageData));
    },
    readFromLocalStorage() {
      // const storageData = JSON.parse(localStorage.getItem('listingData'));
      // this.formData = { ...this.formData, ...storageData };
    },
    handleCompanySelect(company) {
      this.isSaving = true;

      this.available = null;

      this.getCreatePostAvailability(company.id)
        .then((response) => {
          if (response.data.available) {
            this.available = true;
          } else {
            this.available = false;
          }
        })
        .catch(() => {
          this.available = false;
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    handleInternPostClick(event) {
      event.preventDefault();
      [, , this.type] = JOB_TYPES_FOR_DROPDOWN;
      this.typeDisabled = true;
      this.available = true;
    },
  },
  mounted() {
    document.querySelector('#dashboard').classList.remove('hide-nav');
    this.fetchTags()
      .then(() => {
        autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
      });
    // this.readFromLocalStorage();

    if (this.$route.params.postId) {
      this.isSaving = true;
      this.postId = parseInt(this.$route.params.postId, 10);

      this.getPost(this.postId)
        .then((response) => {
          this.formData = response.data.post;
          this.formData.tags = response.data.post.tags.map(tag => tag.name).join(', ');
          this.type = JOB_TYPES_FOR_DROPDOWN[this.formData.type - 1];
          this.available = true;
        })
        .finally(() => {
          this.isSaving = false;
        });
    }
  },
};
</script>

<template>
  <div class="add-job">
    <div
      id="titlebar"
      class="single submit-page"
    >
      <h1>
        <i class="fa fa-plus-circle" />
        {{ postId === null ? 'Yeni İlan Ekle' : 'İlan Düzenle' }}
      </h1>
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
    <div
      v-else
      class="dashboard-list-box margin-top-0"
    >
      <h4>İlan Detayları</h4>
      <div class="dashboard-list-box-content">
        <div class="submit-page">
          <div class="form" style="width: 100%;">
            <h5>Firma</h5>
            <multiselect
              v-model="formData.company"
              :options="companies"
              label="name"
              :searchable="false"
              :close-on-select="true"
              placeholder="Seçiniz..."
              @select="handleCompanySelect"
              v-if="companies"
            />
          </div>
          <div class="form" style="width: 100%;" :class="available === true ? '' : 'hide'">
            <h5>Pozisyon</h5>
            <input v-model="formData.position" class="search-field" type="text">
          </div>
          <div class="form" style="width: 100%;" :class="available === true ? '' : 'hide'">
            <h5>İlan Açıklaması</h5>
            <vue-editor v-model="formData.description" :editor-toolbar="editorToolbar" />
          </div>
          <div class="form" :class="available === true ? '' : 'hide'">
            <h5>Lokasyon</h5>
            <location-select
              v-model="formData.location"
              :value="formData.location"
              :show-all="true"
              :searchable="true"
            />
            <p class="note">
              Uzaktan çalışmaya elverişli bir ilansa Remote seçiniz.
            </p>
          </div>
          <div class="form" :class="available === true ? '' : 'hide'">
            <h5>İlan Tipi</h5>
            <multiselect
              v-model="type"
              :options="typeOptions"
              label="text"
              :searchable="false"
              :close-on-select="true"
              placeholder="Seçiniz..."
              :disabled="typeDisabled"
            />
          </div>
          <div class="form" :class="available === true ? '' : 'hide'">
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
              ya da virgül ile ekleme yapabilirsiniz. En fazla 10 etiket ekleyebilirsiniz.
              <br>
              İlanınıza <code>frontend</code>, <code>backend</code>, <code>mobile</code>,
              <code>designer</code>, <code>qa</code> etiketlerinden birini ekleyip
              ilgili kategoride yer almasını sağlayabilirsiniz.
              <br>
              Doğru ve etkili etiketler seçmek ilanınızın ilan detay sayfasındaki
              "Benzer İlanlar" arasında gözükme şansını arttıracaktır.
            </p>
          </div>
          <div class="form" :class="available === true ? '' : 'hide'">
            <h5>Başvuru bilgileri</h5>
            <input
              v-model="formData.apply_url"
              placeholder="URL"
              class="margin-bottom-10"
              type="text"
            >
            <input v-model="formData.apply_email" placeholder="E-posta" type="text">
          </div>
          <div class="button-container" :class="available === true ? '' : 'hide'">
            <button
              @click="showPreview"
              class="button big margin-top-5 margin-bottom-20"
              type="button"
              v-if="!postId"
            >
              Önizleme <i class="fa fa-arrow-circle-right" />
            </button>
            <button
              @click="save"
              :disabled="isSaving"
              class="button big margin-top-5 margin-bottom-20"
              type="button"
              v-else
            >
              Kaydet <i class="fa fa-check" />
            </button>
          </div>
          <div :class="available === false ? '' : 'hide'">
            <div class="alert alert-danger">
              <p>
                İlan gönderme haklarınızı kullandınız. Pakedinizi yükseltmek için
                <router-link
                  v-if="formData.company"
                  :to="'/paketler?company_id=' + formData.company.id"
                >tıklayın</router-link>.
              </p>
              <p>
                Stajyer ilanları her zaman ücretsiz! Stajyer ilanı oluşturmak için
                <a href="#" @click="handleInternPostClick">tıklayın</a>.
              </p>
            </div>
          </div>
          <div :class="available === null ? '' : 'hide'">
            <Loader />
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

  .hide {
    display: none;
  }
}
</style>
