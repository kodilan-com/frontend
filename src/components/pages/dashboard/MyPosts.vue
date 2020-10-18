<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';

export default {
  metaInfo: {
    title: 'İlanlarım | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      isSaving: false,
      postList: null,
    };
  },
  computed: {
    ...mapGetters(['companies']),
  },
  methods: {
    ...mapActions([
      'getPostList',
      'deletePost',
    ]),
    loadList() {
      this.isSaving = true;
      this.getPostList()
        .then((response) => {
          this.postList = response.data.posts;
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    handleRemoveClick(event, post) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.$modal.show('dialog', {
        title: 'İlanı silmek üzeresiniz.',
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

              this.deletePost(post.id)
                .then(() => {
                  this.loadList();
                })
                .catch(() => {
                  this.isSaving = false;
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
    getDateFromString(string) {
      return new Date(string);
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>

<template>
  <div>
    <!-- Titlebar -->
    <div id="titlebar">
      <div class="row">
        <div class="col-md-12">
          <h2>İlanlarım</h2>
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
              v-if="postList && postList.length > 0"
            >
              <thead>
                <tr>
                  <th><i class="fa fa-building-o" /> Firma</th>
                  <th><i class="fa fa-briefcase" /> Pozisyon</th>
                  <th><i class="fa fa-check" /> Durum</th>
                  <th><i class="fa fa-clock-o" /> Son Güncelleme</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                <tr v-for="post of postList" :key="post.id">
                  <td class="title">
                    {{ post.company.name }}
                  </td>
                  <td>
                    {{ post.position }}
                  </td>
                  <td>
                    <span v-if="post.status === 0">
                      Reddedildi
                    </span>
                    <span v-else-if="post.status === 1">
                      Yayınlandı
                    </span>
                    <span v-else>
                      Yayından kaldırıldı
                    </span>
                  </td>
                  <td>
                    {{ getDateFromString(post.updated_at).toLocaleString() }}
                  </td>
                  <td class="action">
                    <a target="_blank" :href="post.post_url">
                      <i class="fa fa-chevron-right" /> Göster
                    </a>
                    <router-link :to="'/hesabim/ilanlarim/' + post.id + '/duzenle'">
                      <i class="fa fa-pencil" /> Düzenle
                    </router-link>
                    <a href="#" class="delete" @click="handleRemoveClick($event, post)">
                      <i class="fa fa-remove" /> Sil
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="notification notice" v-else>
              Henüz bir ilanınız yok.

              Oluşturmak için
              <router-link to="/hesabim/ilanlarim/ekle">tıklayın</router-link>.
            </div>
          </div>
        </div>
        <router-link to="/hesabim/ilanlarim/ekle" class="button margin-top-30">
          İlan Ekle
        </router-link>
      </div>
    </div>
  </div>
</template>
