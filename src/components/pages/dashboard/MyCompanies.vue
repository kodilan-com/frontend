<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';

export default {
  metaInfo: {
    title: 'Firmalarım | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      isSaving: false,
      formData: {
        name: null,
        email: null,
        password_new: null,
        password_current: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapGetters(['companies']),
  },
  methods: {
    ...mapActions([
      'getUser',
      'deleteCompany',
    ]),
    handleRemoveClick(event, company) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.$modal.show('dialog', {
        title: `${company.name} firmasını silmek üzeresiniz.`,
        text: 'Silmek istediğinizden emin misiniz?',
        buttons: [
          {
            title: 'İptal',
            default: true,
          },
          {
            title: 'Sil',
            handler: () => {
              this.isSaving = true;

              this.deleteCompany(company.id)
                .then(() => {
                  this.getUser()
                    .finally(() => {
                      this.isSaving = false;
                    });
                })
                .finally(() => {
                  this.$modal.hide('dialog');
                });
            },
          },
        ],
      });
    },
    showErrorDialog(text) {
      const subject = encodeURI('Hata');

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
  },
  mounted() {
    this.isSaving = true;
    this.getUser()
      .finally(() => {
        this.isSaving = false;
      });
  },
};
</script>

<template>
  <div>
    <!-- Titlebar -->
    <div id="titlebar">
      <div class="row">
        <div class="col-md-12">
          <h2>Firmalarım</h2>
        </div>
      </div>
    </div>


    <div v-if="isSaving">
      <Loader />
    </div>
    <div class="row" v-else>
      <!-- Table-->
      <div class="col-lg-12 col-md-12">
        <div class="dashboard-list-box margin-top-30">
          <div class="dashboard-list-box-content">
            <!-- Table -->
            <table
              class="manage-table resumes responsive-table"
              v-if="companies && companies.length > 0"
            >
              <thead>
                <tr>
                  <th><i class="fa fa-user" /> Firma</th>
                  <th><i class="fa fa-unlock-alt" /> Rol</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                <tr v-for="company of companies" :key="company.id">
                  <td class="title">
                    {{ company.name }}
                  </td>
                  <td>
                    <span v-if="company.pivot.is_admin_at !== null">Yönetici</span>
                    <span v-else>Kullanıcı</span>
                  </td>
                  <td class="action" v-if="company.pivot.is_admin_at !== null">
                    <router-link :to="'/hesabim/firmalarim/' + company.id + '/duzenle'">
                      <i class="fa fa-pencil" /> Düzenle
                    </router-link>
                    <a href="#" class="delete" @click="handleRemoveClick($event, company)">
                      <i class="fa fa-remove" /> Sil
                    </a>
                  </td>
                  <td class="action" v-else />
                </tr>
              </tbody>
            </table>

            <div class="notification notice" v-else>
              Henüz bir firmanız yok.
            </div>
          </div>
        </div>
        <router-link to="/hesabim/firmalarim/ekle" class="button margin-top-30">
          Firma Ekle
        </router-link>
      </div>
    </div>
  </div>
</template>
