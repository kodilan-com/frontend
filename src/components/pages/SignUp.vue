<script>
import { mapActions } from 'vuex';

import Loader from '../shared/Loader';
import validationMixin from '../../mixins/validator';

export default {
  mixins: [validationMixin],
  components: {
    Loader,
    // JobDetails,
    // LocationSelect,
  },
  data() {
    return {
      isSaving: false,
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name: {
          required: true,
          message: 'İsim boş bırakılamaz.',
        },
        email: {
          required: true,
          message: 'E-posta adresi boş bırakılamaz.',
        },
        password: {
          required: true,
          message: 'Parola boş bırakılamaz.',
        },
        password_confirmation: {
          required: true,
          message: 'Seçtiğiniz parolayı tekrar girmelisiniz.',
        },
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(['registerUser', 'setAccessToken']),
    getPostData() {
      const postData = {
        ...this.formData,
      };

      return postData;
    },
    register(event) {
      event.preventDefault();

      if (this.isSaving) {
        return false;
      }

      if (!this.validateForm()) {
        const messages = Object.values(this.validationErrorMessages).map(e => `<li>${e}</li>`);
        const errorBody = `Lütfen aşağıdaki alanları kontrol ediniz.<ul>${messages.join('')}</ul>`;

        return this.showErrorDialog(errorBody);
      }

      this.isSaving = true;

      return this.registerUser(this.getPostData())
        .then((response) => {
          const accessToken = response.data.access_token;
          this.setAccessToken(accessToken);
          localStorage.setItem('user', JSON.stringify({
            name: this.formData.name,
            email: this.formData.email,
          }));
          this.saveToLocalStorage();

          this.$modal.show('dialog', {
            text: 'E-posta adresinize gönderilen bağlantıya tıklayarak adresinizi doğrulayın.',
            title: 'Kodilan.com hesabınızı oluşturdunuz!',
            buttons: [
              {
                title: 'Kapat',
              },
            ],
          });
          this.$router.push('/');
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
      const subject = encodeURI('Kayıt Olurken Hata');

      this.$modal.show('dialog', {
        text,
        title: 'Kayıt başarısız!',
        buttons: [{
          title: `<a href="mailto:info@kodilan.com?subject=${subject}" >Hata bildir!</a>`,
        },
        {
          title: 'Kapat',
        }],
      });
    },
    parseErrors(e) {
      const errors = e.response.data.errors || [];
      const details = Object.values(errors)
        .reduce((arr, err) => arr.concat(err), [])
        .map(err => `<li>${err}</li>`);

      return `<ul>${details.join('')}</ul>`;
    },
    saveToLocalStorage() {
      const postData = this.getPostData();
      const storageData = {
        name: postData.name,
        email: postData.email,
      };
      localStorage.setItem('registerData', JSON.stringify(storageData));
    },
    readFromLocalStorage() {
      const storageData = JSON.parse(localStorage.getItem('registerData'));
      this.formData = {
        ...this.formData,
        ...storageData,
      };
    },
  },
  mounted() {
    this.readFromLocalStorage();
  },
};
</script>

<template>
  <div class="register">
    <div id="titlebar" class="single submit-page">
      <div class="container">
        <div class="sixteen columns">
          <h1>
            Kayıt Ol
          </h1>
        </div>
      </div>
    </div>
    <Loader v-if="isSaving" />
    <div class="container" v-else>
      <div class="row">
        <div class="col-lg-6 col-md-12 margin-bottom-30">
          <form method="post" class="register" @submit="register">
            <p class="form-row form-row-wide">
              <label for="name">İsim:
                <i class="ln ln-icon-Male" />
                <input
                  v-model="formData.name"
                  class="input-text"
                  type="text"
                  name="name"
                  id="name"
                  required
                >
              </label>
            </p>

            <p class="form-row form-row-wide">
              <label for="email">E-posta adresi:
                <i class="ln ln-icon-Mail" />
                <input
                  v-model="formData.email"
                  class="input-text"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="mail@example.com"
                  required
                >
              </label>
            </p>

            <p class="form-row form-row-wide">
              <label for="password">Parola:
                <i class="ln ln-icon-Lock-2" />
                <input
                  v-model="formData.password"
                  class="input-text"
                  type="password"
                  name="password"
                  id="password"
                  required
                >
              </label>
            </p>

            <p class="form-row form-row-wide">
              <label for="password_confirmation">Parolayı Tekrarlayın:
                <i class="ln ln-icon-Lock-2" />
                <input
                  v-model="formData.password_confirmation"
                  class="input-text"
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  required
                >
              </label>
            </p>

            <p class="form-row">
              <button type="submit" class="button border fw margin-top-0">
                Kayıt Ol
              </button>
            </p>
          </form>

          <router-link to="/giris">Hesabınız var mı? Giriş yapın.</router-link>
        </div>
        <div class="col-lg-6 col-md-12 margin-bottom-30">
          <h1>Neden kayıt olmalısınız?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
