<script>
import AppHeader from './components/shared/AppHeader';
import AppFooter from './components/shared/AppFooter';

export default {
  name: 'App',
  components: {
    AppHeader,
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
@import './assets/css/style.css';
@import './assets/css/colors/green.css';
</style>
