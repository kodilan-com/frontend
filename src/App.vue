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
    <app-header
      :with-banner="$route.meta.hasBanner"
    />
    <div id="wrapper">
      <router-view />
      <app-footer />
    </div>
  </div>
</template>
