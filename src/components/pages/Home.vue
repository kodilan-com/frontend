<script>
import JobList from '../shared/JobList';
import JobSpotlight from '../shared/JobSpotlight';
import InfoBanner from '../shared/InfoBanner';

export default {
  components: {
    JobList,
    JobSpotlight,
    InfoBanner,
  },
};
</script>

<template>
  <div>
    <div class="container">
      <job-list />
      <job-spotlight />
    </div>
    <info-banner />
  </div>
</template>
