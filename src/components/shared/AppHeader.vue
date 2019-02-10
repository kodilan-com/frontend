<script>
import AppBanner from './AppBanner';

export default {
  components: {
    AppBanner,
  },
  props: {
    withBanner: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<template>
  <section>
    <header class="app-header sticky-header">
      <div class="container">
        <div class="sixteen columns">
          <div id="logo">
            <h1>
              <router-link to="/">
                <span class="token">
                  {
                </span>kod<span class="token">
                  ,
                </span>ilan<span class="token">
                  }
                </span>
              </router-link>
            </h1>
          </div>
          <nav
            id="navigation"
            class="menu"
          >
            <ul class="responsive float-right">
              <li>
                <router-link
                  class="add-post button"
                  to="/ilan-ekle"
                >
                  <i class="fa fa-plus" />
                  <span>Ücretsiz İlan Ekle</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <div class="clearfix" />

    <app-banner
      v-if="withBanner"
    />
  </section>
</template>

<style lang="scss">
.app-header {
  #logo h1 {
    line-height: 98px;
    font-size: 36px;

    a {
      color: #333;

      .token {
        color: #26ae61;
        font-weight: 500;
      }
    }
  }

  .add-post {
    background: #26ae61;
    color: #fff;
    font-size: 16px;
    padding: 12px 22px;
  }
}
</style>
