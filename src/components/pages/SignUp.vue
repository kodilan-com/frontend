<script>
import { mapActions } from 'vuex';
import RequestView from './RequestView';

export default {
  components: {
    RequestView,
  },
  data() {
    return {
      userRegister: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    ...mapActions(['signUp']),
    submitRegister() {
      this.signUp(this.userRegister)
        .then(() => {
          this.$router.push({ name: 'CreateCompany' });
        })
        .catch(error => console.log(error.response.data));
    },
  },
};
</script>

<template>
  <div>
    <request-view :active="false" />
    <div class="container">
      <div class="my-account">
        <div class="tabs-container">
          <div class="tab-content" id="tab2">
            <form method="post" class="register">
              <p class="form-row form-row-wide">
                <label for="username2">Kullanıcı Adı:
                  <i class="ln ln-icon-Male" />
                  <input v-model="userRegister.name"
                         class="input-text"
                         type="text"
                  >
                </label>
              </p>
              <p class="form-row form-row-wide">
                <label for="email2">Email Adresi:
                  <i class="ln ln-icon-Mail" />
                  <input v-model="userRegister.email"
                         type="text"
                         class="input-text"
                  >
                </label>
              </p>
              <p class="form-row form-row-wide">
                <label for="password1">Parola:
                  <i class="ln ln-icon-Lock-2" />
                  <input v-model="userRegister.password"
                         type="password"
                         class="input-text"
                  >
                </label>
              </p>
              <p class="form-row form-row-wide">
                <label for="password2">Parolayı Doğrula:
                  <i class="ln ln-icon-Lock-2" />
                  <input v-model="userRegister.password_confirmation"
                         type="password"
                         class="input-text"
                  >
                </label>
              </p>
              <p class="form-row">
                <input @click.prevent="submitRegister"
                       type="submit"
                       class="button border fw margin-top-10"
                       value="Kayıt Ol"
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
