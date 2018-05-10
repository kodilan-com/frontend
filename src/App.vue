<script>
import AppHeader from './components/shared//AppHeader';
import InfoBanner from './components/shared/InfoBanner';
import AppFooter from './components/shared/AppFooter';

export default {
  name: 'App',
  components: {
    AppHeader,
    InfoBanner,
    AppFooter,
  },
};
</script>

<template>
  <div id="app">
    <div id="main-wrapper">
      <app-header
        :with-banner="$route.meta.hasBanner"
      />
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<style>
@import '../static/css/style.css';
@import '../static/css/colors/green.css';
</style>
