<script>
import { mapActions } from 'vuex';

import Loader from '../shared/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      formData: {
        email: null,
      },
      formDataPassword: {
        secret: null,
        password: null,
        password_confirmation: null,
      },
      loading: true,
    };
  },
  methods: {
    ...mapActions(['sendPasswordResetEmail', 'resetPassword']),
    handleFormSubmit(event) {
      event.preventDefault();

      if (this.loading) return;
      this.loading = true;

      this.sendPasswordResetEmail({ email: this.formData.email })
        .then(() => {
          this.showDialog('E-posta adresine ait bir hesap varsa parola sıfırlama e-postası gönderildi.');
        })
        .catch(() => {
          this.showDialog('Parola sıfırlama e-postası gönderilemedi.');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePasswordFormSubmit(event) {
      event.preventDefault();

      if (this.loading) return;
      this.loading = true;

      this.resetPassword(this.formDataPassword)
        .then(() => {
          this.showDialog('Parolan sıfırlandı.');
        })
        .catch(() => {
          this.showDialog('Parola sıfırlanamadı.');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showDialog(text) {
      const subject = encodeURI('Hata');

      this.$modal.show('dialog', {
        text,
        title: 'Parola sıfırlama başarısız!',
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
    this.loading = false;

    if (this.$route.query.secret) {
      this.formDataPassword.secret = this.$route.query.secret;
    }
  },
};
</script>

<template>
  <div class="my-account">
    <Loader v-if="loading" />
    <div class="" v-else>
      <form @submit="handleFormSubmit" v-if="formDataPassword.secret === null">
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

        <p>
          Hesabınıza ait e-posta adresinizi girin.
        </p>

        <p class="form-row">
          <button type="submit" class="button border fw margin-top-10">
            Gönder
          </button>
        </p>
      </form>

      <form @submit="handlePasswordFormSubmit" v-if="formDataPassword.secret !== null">
        <p class="form-row form-row-wide">
          <label for="password">Yeni Parola:
            <i class="ln ln-icon-Lock-2" />
            <input
              v-model="formDataPassword.password"
              class="input-text"
              type="password"
              name="password"
              id="password"
              minlength="8"
              required
              autocomplete="new-password"
            >
          </label>
        </p>

        <p class="form-row form-row-wide">
          <label for="password_confirmation">Yeni Parola Tekrar:
            <i class="ln ln-icon-Lock-2" />
            <input
              v-model="formDataPassword.password_confirmation"
              class="input-text"
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              minlength="8"
              required
              autocomplete="new-password"
            >
          </label>
        </p>

        <p class="form-row">
          <button type="submit" class="button border fw margin-top-10">
            Sıfırla
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
