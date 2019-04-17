<script>
import Subscribe from '../shared/Subscribe';
import JobSpotlight from '../shared/JobSpotlight';

export default {
  components: {
    Subscribe,
    JobSpotlight,
  },
}
</script>


<template>
  <div class="container subscribe-landing">
    <subscribe class="section-background" />
    <job-spotlight class="" :content-length="600" />
  </div>
</template>

<style lang="scss">
.subscribe-landing {
  .subscribe-widget {
    text-align: left;
    padding: 40px;
    margin-top: 0;
    background: #f4f4f4;

    input {
      width: 100% !important;
      margin-bottom: 10px;
    }
  }

  .job-spotlight {
    .button {
      width: 200px;
      display: block;
    }
  }
}
</style>
