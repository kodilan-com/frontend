<script>
import { mapActions, mapGetters } from 'vuex';
import AppBanner from './AppBanner';
import AppTopbar from './AppTopbar';

export default {
  props: {
    withBanner: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    AppBanner,
    AppTopbar,
  },
  computed: {
    ...mapGetters(['user', 'accessToken']),
  },
  methods: {
    ...mapActions(['setUser', 'setAccessToken']),
    logout() {
      this.setAccessToken(null);
      this.setUser(null);
      this.$router.push('/giris');
    },
    handleAddPostClick(event) {
      if (this.user && !this.user.companies.length) {
        const subject = encodeURI('Hata');

        this.$modal.show('dialog', {
          text: 'İlan ekleyebilmek için önce bir firma eklemelisiniz.',
          title: 'Henüz firmanız yok',
          buttons: [{
            title: `<a href="mailto:info@kodilan.com?subject=${subject}" >Hata bildir!</a>`,
          },
          {
            title: 'Kapat',
          }],
        });
        this.$router.push('/hesabim/firmalarim/ekle');
        event.preventDefault();

        return false;
      }

      return true;
    },
  },
};
</script>

<template>
  <section>
    <app-topbar />
    <header class="app-header sticky-header">
      <div class="container">
        <div class="sixteen columns">
          <div id="logo">
            <h2>
              <router-link to="/">
                <span>{ </span>kod<span>, </span>ilan<span> }</span>
              </router-link>
            </h2>
          </div>
          <nav id="navigation" class="menu">
            <ul class="responsive float-right">
              <!-- <li class="header-subs">
                <router-link to="/abone-ol">
                  <i class="fa fa-bullhorn" />
                  <span class>
                    Abone ol!
                  </span>
                </router-link>
              </li> -->
              <li>
                <router-link
                  class="add-post button tag-create-post"
                  to="/ilan-ekle"
                >
                  <i class="fa fa-plus" />
                  <span class="tag-create-post" @click="handleAddPostClick">
                    Ücretsiz İlan Ekle
                  </span>
                </router-link>
              </li>
              <li class="header-subs" v-if="user === null">
                <router-link class="button" to="/kayit-ol">
                  <i class="fa fa-user" />
                  <span>Kayıt Ol</span>
                </router-link>
              </li>
              <li class="header-subs" v-else>
                <a class="button" href="#">
                  <i class="fa fa-user" />
                  <span>{{ user.name }}</span>
                  &nbsp;<i class="fa fa-caret-down" />
                </a>

                <ul>
                  <li>
                    <router-link class="button" to="/hesabim">
                      Ayarlar
                    </router-link>

                    <a @click.prevent="logout()" href="#">Çıkış</a>
                  </li>
                </ul>
              </li>
              <!-- <li><a href="my-account.html"><i class="fa fa-lock"></i> Log In</a></li> -->
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <div class="clearfix" />
    <app-banner v-if="withBanner" />
  </section>
</template>

<style lang="scss">
.app-header {
  #logo h2 {
    line-height: 98px;
    font-size: 36px;

    a {
      color: #333;

      span {
        color: #26ae61;
        font-weight: 500;
      }
    }
  }

  #navigation {
    a {
      background: #26ae61;
      color: #fff;
      font-size: 16px;
      padding: 12px 22px;
    }

    .header-subs a {
      background: #666;
    }

    i {
      margin-right: 10px !important;
    }

    ul.float-right ul {
      left: unset;
      right: 0;
    }

    ul.float-right ul::before {
      left: unset;
      right: 13px;
    }
  }
}
</style>
