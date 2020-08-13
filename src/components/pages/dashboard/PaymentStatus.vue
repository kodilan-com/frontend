<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';

export default {
  metaInfo: {
    title: 'Ödemeniz Kontrol Ediliyor | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      isSaving: false,
      paymentId: null,
      success: null,
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      'getPaymentStatus',
    ]),
  },
  mounted() {
    if (this.$route.params.paymentId) {
      this.paymentId = parseInt(this.$route.params.paymentId, 10);
    }

    if (this.$route.query.success) {
      this.success = parseInt(this.$route.query.success, 10);
    }
  },
};
</script>
<template>
  <div>
    <loader v-if="isSaving" />
    <div v-else>
      <div id="titlebar">
        <h1>Ödemeler</h1>
      </div>

      <div class="dashboard-list-box margin-top-30" style="text-align: center;">
        <div class="dashboard-list-box-static">
          <div class="text-success" v-if="success">
            <i class="fa fa-check" style="font-size: calc(5vw + 5vw)" />
            <h1>Ödemeniz Başarılı</h1>
          </div>
          <div class="text-danger" v-else>
            <i class="fa fa-check" style="font-size: calc(5vw + 5vw)" />
            <h1>Ödemeniz Onaylanmadı</h1>
          </div>

          <router-link to="/hesabim/odemeler">
            Ödemelere Dön
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
