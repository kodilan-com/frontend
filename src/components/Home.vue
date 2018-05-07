<script>
import AppHeader from './shared/AppHeader';
import JobList from './shared/JobList';
import JobSpotlight from './shared/JobSpotlight';
import InfoBanner from './shared/InfoBanner';
import AppFooter from './shared/AppFooter';

export default {
  components: {
    AppHeader,
    JobList,
    JobSpotlight,
    InfoBanner,
    AppFooter,
  },
};
</script>

<template>
  <div>
    <app-header :with-banner="true" />
    <div class="container">
      <job-list />
      <job-spotlight />
    </div>
    <info-banner />
    <app-footer />
  </div>
</template>
