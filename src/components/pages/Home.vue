<script>
import RecentJobsList from '../shared/RecentJobsList';
import JobSpotlight from '../shared/JobSpotlight';
import Testimonials from '../shared/Testimonials';
import InfoBanner from '../shared/InfoBanner';
import Subscribe from '../shared/Subscribe';
import homeMetaInfoMixin from '../../mixins/homeMetaInfo';

export default {
  mixins: [homeMetaInfoMixin],
  components: {
    RecentJobsList,
    JobSpotlight,
    Testimonials,
    InfoBanner,
    Subscribe,
  },
};
</script>

<template>
  <div id="home">
    <div class="container">
      <recent-jobs-list />
      <job-spotlight class="five" />
    </div>
    <info-banner />
    <div class="container subscribe">
      <div class="sixteen columns">
        <div class="info-banner">
          <subscribe />
        </div>
      </div>
    </div>
    <testimonials />
  </div>
</template>

<style lang="scss">
.container.subscribe {
  margin-top: 8px;

  .subscribe-widget > * {
    display: block !important;
    width: 100% !important;
    margin-bottom: 8px !important;
  }
}

@media only screen and (min-width: 768px) {
  .container.subscribe {
    display: none;
  }
}
</style>
