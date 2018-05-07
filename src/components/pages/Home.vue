<script>
import RecentJobsList from '../shared/RecentJobsList';
import JobSpotlight from '../shared/JobSpotlight';
import InfoBanner from '../shared/InfoBanner';

export default {
  components: {
    RecentJobsList,
    JobSpotlight,
    InfoBanner,
  },
};
</script>

<template>
  <div>
    <div class="container">
      <recent-jobs-list />
      <job-spotlight />
    </div>
    <info-banner />
  </div>
</template>
