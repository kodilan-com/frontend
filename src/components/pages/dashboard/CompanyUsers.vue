<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';

export default {
  metaInfo: {
    title: 'Kullanıcılar | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      companyId: null,
      isSaving: false,
      company: null,
      newUserEmail: null,
    };
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([
      'addCompanyUser',
      'getCompany',
      'setCompanyUserStatus',
      'deleteCompanyUser',
    ]),
    handleUserRoleChange(user) {
      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      const formData = {
        companyId: this.companyId,
        userId: user.id,
        is_admin: user.pivot.is_admin_at === null ? 1 : 0,
      };

      this.setCompanyUserStatus(formData)
        .then(() => {
          this.loadCompany();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return this.showErrorDialog('Kullanıcı bulunamadı.');
          }

          this.isSaving = false;

          return this.showErrorDialog('Bir sunucu hatası oldu.');
        });
    },
    handleNewUserSubmit(event) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      this.addCompanyUser({ email: this.newUserEmail, companyId: this.companyId })
        .then(() => {
          this.loadCompany();
          this.newUserEmail = null;
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return this.showErrorDialog('Kullanıcı bulunamadı.');
          }
          this.isSaving = false;

          return this.showErrorDialog('Bir sunucu hatası oldu.');
        });
    },
    handleRemoveClick(event, user) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      this.deleteCompanyUser({ companyId: this.companyId, userId: user.id })
        .then(() => {
          this.loadCompany();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            return this.showErrorDialog('Kullanıcı bulunamadı.');
          }

          if (error.response.status === 403) {
            return this.showErrorDialog(error.response.data.errors[0]);
          }

          this.isSaving = false;

          return this.showErrorDialog('Bir sunucu hatası oldu.');
        });
    },
    loadCompany() {
      this.isSaving = true;

      this.getCompany(this.companyId)
        .then((response) => {
          this.company = response.data.company;
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
    if (this.$route.params.companyId) {
      this.companyId = parseInt(this.$route.params.companyId, 10);

      this.loadCompany();
    }
  },
};
</script>

<template>
  <div>
    <div>
      <loader v-if="isSaving" />

      <div v-else>
        <!-- Titlebar -->
        <div id="titlebar" v-if="company !== null">
          <h1>{{ company.name }} Kullanıcıları</h1>
        </div>

        <div class="dashboard-list-box margin-top-0">
          <div class="dashboard-list-box-content">
            <!-- Table -->
            <table
              class="manage-table resumes responsive-table"
              v-if="company !== null && company.users.length > 0"
            >
              <thead>
                <tr>
                  <th><i class="fa fa-user" /> İsim</th>
                  <th><i class="fa fa-unlock-alt" /> Rol</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                <tr v-for="user of company.users" :key="user.id">
                  <td class="title">
                    {{ user.name }}
                  </td>
                  <td>
                    <!-- <span v-if="user.pivot.is_admin_at !== null">Yönetici</span>
                    <span v-else>Kullanıcı</span> -->
                    <select @change="handleUserRoleChange(user)">
                      <option
                        value="0"
                        :selected="user.pivot.is_admin_at === null ? true : false"
                      >Kullanıcı</option>
                      <option
                        value="1"
                        :selected="user.pivot.is_admin_at !== null ? true : false"
                      >Yönetici</option>
                    </select>
                  </td>
                  <td class="action">
                    <!-- <router-link :to="'/hesabim/firmalarim/' + company.id + '/duzenle'">
                      <i class="fa fa-pencil" /> Düzenle
                    </router-link>
                    <router-link :to="'/hesabim/firmalarim/' + company.id + '/kullanicilar'">
                      <i class="fa fa-user" /> Kullanıcılar
                    </router-link> -->
                    <a
                      href="#"
                      class="delete"
                      @click="handleRemoveClick($event, user)"
                      v-if="company.users.length > 1"
                    ><i class="fa fa-remove" /> Sil</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="dashboard-list-box">
          <div class="dashboard-list-box-static">
            <form @submit="handleNewUserSubmit">
              <div class="form">
                <label for="new_user_email">
                  <h3>Yeni Kullanıcı Ekle</h3>
                </label>
                <input
                  type="text"
                  name="new_user_email"
                  id="new_user_email"
                  placeholder="kullanici@example.com"
                  required
                  v-model="newUserEmail"
                >
              </div>

              <div class="button-container margin-top-10">
                <button class="button big margin-top-5" type="submit">
                  Ekle <i class="fa fa-save" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
