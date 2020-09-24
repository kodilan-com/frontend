<script>
import { mapActions } from 'vuex';
import AppHeader from './components/shared/AppHeader';
import AppFooter from './components/shared/AppFooter';
import Subscribe from './components/shared/Subscribe';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Subscribe,
  },
  methods: {
    ...mapActions(['setAccessToken', 'getUser', 'fetchAllLocations']),
  },
  mounted() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.setAccessToken(accessToken);
      this.getUser();
      this.fetchAllLocations();
    }
  },
};
</script>

<template>
  <div id="app">
    <div id="main-wrapper">
      <app-header :with-banner="$route.meta.hasBanner" />
      <router-view />
    </div>
    <app-footer />
    <subscribe :fixed="true" />
    <v-dialog />
  </div>
</template>

<style>
@import './assets/css/style.css';
@import './assets/css/theme.css';
@import './assets/css/responsive.css';

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#banner {
  z-index: 1;
}

table.manage-table.resumes td {
  padding: 15px 10px;
}
</style>
