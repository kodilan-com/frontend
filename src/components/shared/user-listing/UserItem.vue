<script>
import userDetail from '../../../mixins/userDetail';
import image from '../../../mixins/image';

export default {
  mixins: [userDetail, image],
  components: {
  },
};
</script>

<template>
  <li>
    <router-link :to="detailsUrl">
      <!-- <img src="images/avatar-placeholder.png"> -->
      <div class="resumes-list-content">
        <h4>{{ user.title }}</h4>
        <span><i class="fa fa-map-marker" /> {{ user.location.name }}</span>
        <!-- <span><i class="fa fa-money" /> $35 / hour</span> -->
        <p>Over 8000 hours on oDesk (only Drupal related). Highly motivated, goal-oriented, hands-on senior software engineer with extensive technical skills and over 15 years of experience in software development</p>

        <div class="skills">
          <span v-for="tag in user.tags" :key="tag.slug">
            {{ tag.name }}
          </span>
        </div>
        <div class="date">
          {{ timeago }}
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
    </router-link>
  </li>
</template>

<style lang="scss">
.resumes-list.alternative .resumes-list-content {
  margin-left: 0;
  padding: 34px;

  .date {
    bottom: 34px;
    color: #808080;
    font-size: 12px;
    position: absolute;
    right: 34px;
  }
}
</style>
