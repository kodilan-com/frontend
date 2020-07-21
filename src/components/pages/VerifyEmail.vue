<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../shared/Loader';

export default {
  components: {
    Loader,
  },
  data() {
    return {
      verificationCode: null,
      success: null,
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['verifyUser']),
  },
  mounted() {
    this.verificationCode = this.$route.query.verification_code;

    this.verifyUser({ verification_code: this.verificationCode })
      .then((response) => {
        this.success = true;
        console.log(response);
      })
      .catch(() => {
        this.success = false;
      });
  },
};
</script>

<template>
  <div>
    <Loader v-if="success === null" />
    <div class="notification success center" v-if="success === true">
      <p>
        <span>E-posta adresiniz doğrulandı!</span>
      </p>
      <p v-if="user !==null">
        <router-link to="/">
          Ana sayfaya git
        </router-link>
      </p>
      <p v-else>
        <router-link to="/giris">
          Giriş yap
        </router-link>
      </p>
    </div>
    <div class="notification error center" v-if="success === false">
      <p>
        <span>Doğrulama başarısız.</span>
      </p>
    </div>
  </div>
</template>
