<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';

export default {
  metaInfo: {
    title: 'Ödemeler | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      list: null,
      isSaving: false,
      formData: {
        company: null,
        amount: null,
      },
    };
  },
  computed: {
    ...mapGetters(['companies']),
  },
  methods: {
    ...mapActions([
      'getPaymentList',
    ]),
    loadPayments() {
      if (this.isSaving) return;

      this.isSaving = true;

      this.getPaymentList()
        .then((response) => {
          this.list = response.data.payments;
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
    this.loadPayments();
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

      <div class="dashboard-list-box margin-top-30">
        <div class="dashboard-list-box-content">
          <table
            class="manage-table resumes responsive-table"
            v-if="list && list.length > 0"
          >
            <thead>
              <tr>
                <th><i class="fa fa-building-o" /> Firma</th>
                <th><i class="fa fa-user" /> Kişi</th>
                <th><i class="fa fa-try" /> Miktar</th>
                <th><i class="fa fa-calendar" /> Tarih</th>
                <th><i class="fa fa-money" /> Durum</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item of list" :key="item.id">
                <td class="title">
                  {{ item.company.name }}
                </td>
                <td>
                  {{ item.user.name }}
                </td>
                <td>
                  {{ item.amount_paid }} <i class="fa fa-try" />
                </td>
                <td>
                  <span v-if="new Date(item.updated_at)">
                    {{ (new Date(item.updated_at)).toLocaleString() }}
                  </span>
                </td>
                <td style="text-align: center">
                  <span class="text-success" v-if="item.is_successful">
                    <i class="fa fa-lg fa-check" />
                  </span>
                  <span class="text-danger" v-else>
                    <i class="fa fa-lg fa-times" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
