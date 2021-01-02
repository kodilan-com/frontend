<script>
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
              <li class="header-subs">
                <router-link to="/mentorlar">
                  <i class="fa fa-users" />
                  <span class>Mentorlar</span>
                </router-link>
              </li>
              <li>
                <router-link class="add-post button tag-create-post" to="/ilan-ekle">
                  <i class="fa fa-plus" />
                  <span class="tag-create-post">
                    Ücretsiz İlan Ekle
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
