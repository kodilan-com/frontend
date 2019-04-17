<script>
import Subscribe from '../shared/Subscribe';
import JobSpotlight from '../shared/JobSpotlight';

export default {
  components: {
    Subscribe,
    JobSpotlight,
  },
};
</script>

<template>
  <div class="container subscribe-landing">
    <div class="columns sixteen">
      <subscribe class="section-background" />
    </div>

    <job-spotlight class="" :content-length="600" />
  </div>
</template>

<style lang="scss">
.subscribe-landing {
  .subscribe-widget {
    text-align: left;
    padding: 30px;
    margin-top: 0;
    background: #f4f4f4;
    border-radius: 3px;
    border: 1px solid #e4e4e4;
    border-bottom-width: 2px;

    input {
      width: 100% !important;
      margin-bottom: 10px;
    }

    span {
      display: block;
      margin: 10px 0;
    }

    button {
      margin-top: 10px;
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
