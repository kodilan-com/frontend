<script>
import { mapActions } from 'vuex';
import RequestView from './RequestView';

export default {
  components: {
    RequestView,
  },
  data() {
    return {
      userLogin: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['login']),
    submitLogin() {
      this.login(this.userLogin)
        .then(res => console.log(res))
        .catch(error => console.log(error.response.data));
    },
  },
};
</script>

<template>
  <div>
    <request-view :active="true" />
    <div class="container">
      <div class="my-account">
        <div class="tabs-container">
          <div class="tab-content" id="tab1">
            <form method="post" class="login">
              <p class="form-row form-row-wide">
                <label for="email2">Email Adresi:
                  <i class="ln ln-icon-Mail" />
                  <input v-model="userLogin.email"
                         type="text"
                         class="input-text"
                  >
                </label>
              </p>
              <p class="form-row form-row-wide">
                <label for="password">Parola:
                  <i class="ln ln-icon-Lock-2" />
                  <input v-model="userLogin.password"
                         class="input-text"
                         type="password"
                         id="password"
                  >
                </label>
              </p>
              <p class="form-row">
                <input @click.prevent="submitLogin"
                       type="submit"
                       class="button border fw margin-top-10"
                       value="Giriş Yap"
                >
                <label for="rememberme" class="rememberme">
                  <input type="checkbox"
                         id="rememberme"
                         value="forever"
                  >
                  Beni Hatırla
                </label>
              </p>
              <p class="lost_password">
                <a href="#">Parolanı mı unuttun?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
