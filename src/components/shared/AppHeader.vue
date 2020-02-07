<script>
import { mapState, mapActions } from 'vuex';
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
    ...mapState(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
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
              <template v-if="!isLoggedIn">
                <li>
                  <router-link to="/kayit-ol">
                    <i class="fa fa-user"></i>
                    Kayıt Ol
                  </router-link>
                </li>
                <li>
                  <router-link to="/giris-yap">
                    <i class="fa fa-lock"></i>
                    Giriş Yap
                  </router-link>
                </li>
              </template>
              <li v-if="isLoggedIn">
                <a href="" @click="logout">Çıkış Yap</a>
              </li>
              <li class="header-subs">
                <router-link to="/abone-ol">
                  <i class="fa fa-bullhorn" />
                  <span class>
                    Abone ol!
                  </span>
                </router-link>
              </li>
              <li>
                <router-link class="add-post button tag-create-post" to="/ilan-ekle">
                  <i class="fa fa-plus" />
                  <span class="tag-create-post">
                    İlan Ekle
                  </span>
                </router-link>
              </li>
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
  }
}
</style>
