<script>
import { mapActions } from 'vuex';
import validationMixin from '../../mixins/validator';

export default {
  mixins: [validationMixin],
  components: {},
  data() {
    return {
      isSaving: false,
      formData: {
        email: '',
        password: '',
      },
      rules: {
        email: {
          required: true,
          message: 'E-posta adresi boş bırakılamaz.',
        },
        password: {
          required: true,
          message: 'Parola boş bırakılamaz.',
        },
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions(['loginUser', 'setAccessToken', 'setUser']),
    getPostData() {
      const postData = {
        ...this.formData,
      };

      return postData;
    },
    login(event) {
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

      return this.loginUser(this.getPostData())
        .then((response) => {
          const accessToken = response.data.access_token;
          const { user } = response.data;
          this.setAccessToken(accessToken);
          this.setUser(user);
          this.$router.push('/');
        })
        .catch((error) => {
          this.showErrorDialog(error.response.data.message);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    showErrorDialog(text) {
      const subject = encodeURI('Hata');

      this.$modal.show('dialog', {
        text,
        title: 'Giriş başarısız!',
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
    //
  },
};
</script>

<template>
  <div class="register">
    <div id="titlebar" class="single submit-page">
      <div class="container">
        <div class="sixteen columns">
          <h1>
            Giriş Yap
          </h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12 margin-bottom-30">
          <form method="post" class="login" @submit="login">
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

            <p class="form-row">
              <button type="submit" class="button border fw margin-top-0">
                Giriş
              </button>
            </p>
          </form>

          <router-link to="/kayit-ol">Hesabınız yok mu? Kayıt olabilirsiniz.</router-link>
          <br>
          <router-link to="/parolami-unuttum">Parolamı unuttum</router-link>
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
