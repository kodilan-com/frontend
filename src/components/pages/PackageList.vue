<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../shared/Loader';

export default {
  metaInfo: {
    title: 'Ödemeler | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      companyId: null,
      company: null,
      packageList: null,
      isSaving: false,
    };
  },
  computed: {
    ...mapGetters(['companies']),
  },
  methods: {
    ...mapActions([
      'getPackageList',
      'getPaymentRequest',
    ]),
    loadPackageList() {
      this.isSaving = true;

      this.getPackageList()
        .then((response) => {
          this.packageList = response.data.list;
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    handlePayFormSubmit(event, packageId) {
      event.preventDefault();
      if (this.isSaving) return;

      this.isSaving = true;

      const formData = {
        company_id: this.company.id,
        package_id: parseInt(packageId, 10),
      };

      this.getPaymentRequest(formData)
        .then((response) => {
          window.open(response.data.payment_url, '_blank');
        })
        .catch(() => {
          this.showErrorDialog('Bir sunucu hatası oluştu.');
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
    if (this.$route.query.company_id) {
      this.companyId = parseInt(this.$route.query.company_id, 10);

      const timeout = setInterval(() => {
        if (this.companies) {
          this.companies.forEach((company) => {
            if (company.id === this.companyId) {
              this.company = company;
              clearTimeout(timeout);
            }
          });
        }
      }, 200);
    }

    this.loadPackageList();
  },
};
</script>
<template>
  <div>
    <div id="titlebar" class="single">
      <div class="container">
        <div class="sixteen columns">
          <h2>Fiyatlandırma</h2>
        </div>
      </div>
    </div>

    <Loader v-if="isSaving" />


    <div class="container" v-if="!isSaving">
      <h3 v-if="company">
        <strong>{{ company.name }}</strong> firmanız için paket seçin.
      </h3>

      <div
        class="plan one-third column"
        v-for="(item, index) in packageList"
        :key="item.id"
        :class="[index === 1 ? 'color-2' : 'color-1']"
      >
        <div class="plan-price">
          <h3>{{ item.title }}</h3>
          <span v-if="item.price === 0">
            <span class="value">Ücretsiz</span>
          </span>
          <span v-else-if="item.price === null">
            <span class="value">İletişime Geçin</span>
          </span>
          <span v-else>
            <span class="value">
              {{ item.price }}
            </span>
            <span class="plan-currency">₺</span>
          </span>
        </div>
        <div class="plan-features">
          <ul>
            <li v-for="(feature, indexFeature) in item.features" :key="indexFeature">
              {{ feature }}
            </li>
          </ul>
          <a
            href="#"
            class="button"
            @click="handlePayFormSubmit($event, item.id)"
            v-if="item.price !== null && item.price > 0"
          >
            <i class="fa fa-shopping-cart" />
            Satın Al
          </a>
          <a
            href="#"
            class="button"
            v-else-if="item.price === 0"
          >
            <i class="fa fa-shopping-cart" />
            Ücretsiz
          </a>
          <a
            href="mailto:info@kodilan.com?subject=Enterprise paket hakkında"
            class="button"
            v-else
          >
            <i class="fa fa-envelope" />
            İletişime Geçin
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  h3 {
    text-align: center;
    margin-bottom: 15px;
  }
</style>
