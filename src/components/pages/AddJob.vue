<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import autocomplete from '../../utils/autocomplete';
import JobDetails from './JobDetails';

export default {
  data() {
    return {
      isPreview: false,
      isSaved: false,
      isSaving: false,
      model: {
        position: '',
        description: '',
        apply_email: '',
        apply_url: '',
        location: '',
        type: 1,
        tags: '',
        company: {
          name: '',
          email: '',
          logo: '',
          www: '',
          twitter: '',
          linkedin: '',
        },
      },
    };
  },
  components: {
    JobDetails,
    VueEditor,
  },
  methods: {
    ...mapActions(['fetchTags', 'savePost']),
    togglePreview() {
      this.isPreview = !this.isPreview;
    },
    save() {
      const postData = {
        ...this.model,
        tags: this.normalizedTags,
      };

      this.isSaving = true;
      this.savePost(postData)
        .then(() => {
          this.isSaved = true;
          this.isSaving = false;
        })
        .catch(() => {
          alert('TODO: ERROR HANDLING');
          this.isSaving = false;
        });
    },
  },
  computed: {
    ...mapGetters(['autocompleteTags']),
    normalizedTags() {
      return this.model.tags
        .split(',')
        .filter((tag) => {
          return tag.trim().length;
        })
        .map((tag) => {
          return tag.trim().toLowerCase();
        });
    },
    previewData() {
      const tagsArr = this.normalizedTags.map((t) => {
        return { name: t, slug: t };
      });

      return {
        ...this.model,
        tags: tagsArr,
      };
    },
  },
  mounted() {
    this.fetchTags().then(() => {
      autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
    });
  },
};
</script>

<template>
  <div class="add-job">
    <div id="titlebar" class="single submit-page">
      <div class="container">
        <div class="sixteen columns">
          <h2>
            <i class="fa fa-plus-circle"></i> Yeni İlan Ekle
          </h2>
        </div>
      </div>
    </div>
    <div
      v-if="isSaved"
      class="notification success center"
    >
      <p>
        <span>İlanınız başarılı bir şekilde kaydedildi!</span><br />
        İlanınızın yayınlanabilmesi için gönderilen e-postadaki onay linkine tıklamanız gerekmektedir.
      </p>
    </div>
    <template v-else>
      <template v-if="isPreview">
        <job-details
          :preview="true"
          :preview-data="previewData"
        />
        <div class="container margin-top-40">
          <button
            @click="togglePreview"
            class="button big back-button"
            type="button"
          >
            <i class="fa fa-arrow-left"></i> Geri dön
          </button>
          <button
            @click="save"
            :disabled="isSaving"
            class="button big save-button"
            type="button"
          >
            Kaydet <i class="fa fa-check"></i>
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
                İlan ekleyebilmek için belirtmiş olduğunuz firma ismiyle uyumlu bir e-posta adresi vermeniz gerekiyor.
                İlan ekledikten sonra doğrulama işlemi için belirtmiş olduğunuz e-posta adresine bir onay e-postası gönderilecektir.
                İlanınız size gelen e-postadaki doğrulama linkine tıkladıktan sonra yayına alınacaktır.
              </p>
            </div>
            <div class="form">
              <h5>E-posta Adresiniz</h5>
              <input
                v-model="model.company.email"
                class="search-field" type="text" placeholder="mail@example.com"
              />
            </div>
            <div class="form">
              <h5>Pozisyon</h5>
              <input
                v-model="model.position"
                class="search-field" type="text"
              />
            </div>
            <div class="form">
              <h5>İlan Açıklaması</h5>
              <vue-editor
                v-model="model.description"
              />
            </div>
            <div class="form">
              <h5>Lokasyon</h5>
              <input
                v-model="model.location"
                class="search-field" type="text"
              />
              <p class="note">Bu ilan uzaktan çalışmaya izin veriyorsa lokasyon olarak Remote yazabilirsiniz.</p>
            </div>
            <div class="form">
              <h5>Job Type</h5>
              <select v-model="model.type">
                <option value="1">Tam zamanlı</option>
                <option value="2">Yarı zamanlı</option>
                <option value="3">Stajyer</option>
                <option value="4">Freelance</option>
              </select>
            </div>
            <div class="form">
              <h5>Etiketler</h5>
              <input
                v-model="model.tags"
                ref="tagsInput"
                class="tags-input" type="text" data-multiple
              />
              <p class="note">Bu pozisyon için gerekli olan yeti ve teknolojileri seçebilirsiniz ya da ekleme yapabilirsiniz.</p>
            </div>
            <div class="form">
              <h5>Başvuru bilgileri</h5>
              <input
                v-model="model.apply_url"
                placeholder="URL"
                class="margin-bottom-10"
                type="text"
              />
              <input
                v-model="model.apply_email"
                placeholder="E-posta"
                type="text"
              />
            </div>

            <div class="divider">
              <h3>Firma Bilgileri</h3>
            </div>
            <div class="form">
              <h5>Firma adı</h5>
              <input
                v-model="model.company.name"
                type="text"
              />
            </div>
            <div class="form">
              <h5>Website</h5>
              <input
                v-model="model.company.www"
                type="text" placeholder="https://"
              />
            </div>
            <div class="form">
              <h5>Logo URL</h5>
              <input
                v-model="model.company.logo"
                type="text" placeholder="https://"
              />
              <p class="note">Logo kare olarak gösterilecektir.</p>
            </div>
            <div class="form">
              <h5>Twitter Kullanıcı adı <span>(opsiyonel)</span></h5>
              <input
                v-model="model.company.twitter"
                type="text" placeholder="@twitter"
              />
            </div>
            <div class="form">
              <h5>Linkedin URL <span>(opsiyonel)</span></h5>
              <input
                v-model="model.company.linkedin"
                type="text" placeholder="https://"
              />
            </div>

            <div class="button-container">
              <button
                @click="togglePreview"
                class="button big margin-top-5"
                type="button"
              >
                Önizleme <i class="fa fa-arrow-circle-right"></i>
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

  select {
    height: 48px;
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
}
</style>
