<script>
export default {
  data() {
    return {
      shouldRender: false,
    };
  },
  created() {
    console.log('amcam was here');
  },
};
</script>

<template>
  <div class="container" v-if="shouldRender">
    <div class="sixteen columns">
      <div class="info-banner">
        <div class="info-content">
          <h3>Perfect Theme for Your Own Job Board</h3>
          <p>Work Scout is a premium theme that is perfect for recruiters and job offices</p>
        </div>
        <a href="#" class="button">Get This Theme</a>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
