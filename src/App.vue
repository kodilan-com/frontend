<script>
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
