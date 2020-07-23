<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';
import helpers from '../../../store/helpers';

export default {
  metaInfo: {
    title: 'Firma Ekle | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      companyId: null,
      isSaving: false,
      formData: {
        name: null,
        email: null,
        logo: null,
        www: null,
        twitter: null,
        linkedin: null,
      },
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      'saveCompany',
      'getCompany',
    ]),
    save(event) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      this.saveCompany({ ...this.formData, companyId: this.companyId || null })
        .then(() => {
          this.$router.push('/hesabim/firmalarim');
        })
        .catch((response) => {
          const errors = helpers.parseErrors(response);
          this.showErrorDialog(`Lütfen gerekli alanları doldurduğunuzdan emin olunuz.${errors}`);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    showErrorDialog(text) {
      const subject = encodeURI('Hata');

      this.$modal.show('dialog', {
        text,
        title: 'Kaydedilemedi!',
        buttons: [{
          title: `<a href="mailto:info@kodilan.com?subject=${subject}" >Hata bildir!</a>`,
        },
        {
          title: 'Kapat',
        }],
      });
    },
  },
  mounted() {
    if (this.$route.params.companyId) {
      this.companyId = parseInt(this.$route.params.companyId, 10);
      this.isSaving = true;

      this.getCompany(this.companyId)
        .then((response) => {
          this.formData.name = response.data.company.name;
          this.formData.email = response.data.company.email;
          this.formData.www = response.data.company.www;
          this.formData.logo = response.data.company.logo;
          this.formData.twitter = response.data.company.twitter;
          this.formData.linkedin = response.data.company.linkedin;
        })
        .finally(() => {
          this.isSaving = false;
        });
    }
  },
};
</script>

<template>
  <div>
    <div class="row">
      <!-- Profile -->
      <div class="col-lg-6 col-md-12" v-if="isSaving">
        <loader />
      </div>
      <div class="col-lg-6 col-md-12" v-else>
        <div class="dashboard-list-box margin-top-0">
          <div class="dashboard-list-box-static">
            <!-- Titlebar -->
            <div id="titlebar">
              <div class="row">
                <div class="col-md-12">
                  <h1>Firma Ekle</h1>
                </div>
              </div>
            </div>
            <form @submit="save">
              <div class="form">
                <h5>Firma adı</h5>
                <input v-model="formData.name" type="text" required>
              </div>
              <div class="form">
                <h5>E-Posta</h5>
                <input v-model="formData.email" type="email" required>
                <p class="note">
                  İlan ekleyebilmek için belirtmiş olduğunuz firma ismiyle uyumlu bir e-posta
                  adresi vermeniz gerekiyor. İlan ekledikten sonra doğrulama işlemi için belirtmiş
                  olduğunuz e-posta adresine bir onay e-postası gönderilecektir. İlanınız size
                  gelen e-postadaki doğrulama linkine tıkladıktan sonra yayına alınacaktır.
                </p>
              </div>
              <div class="form">
                <h5>Web Sitesi</h5>
                <input v-model="formData.www" type="url" placeholder="https://" required>
              </div>
              <div class="form">
                <h5>Logo URL</h5>
                <input v-model="formData.logo" type="url" placeholder="https://" required>
                <p class="note">
                  Logo kare olarak gösterilecektir.
                </p>
              </div>
              <div class="form">
                <h5>Twitter Kullanıcı adı <span>(opsiyonel)</span></h5>
                <input v-model="formData.twitter" type="text" placeholder="@twitter">
              </div>
              <div class="form">
                <h5>Linkedin URL <span>(opsiyonel)</span></h5>
                <input v-model="formData.linkedin" type="text" placeholder="https://">
              </div>

              <div class="button-container margin-top-10">
                <button class="button big margin-top-5" type="submit">
                  Kaydet <i class="fa fa-save" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
