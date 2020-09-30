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
        <span v-if="user.expected_wage">
          <i class="fa fa-money" /> {{ user.expected_wage.toLocaleString() }} ₺ / ay
        </span>
        <p>{{ user.bio }}</p>

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

  p {
    display: block;
  }
}
</style>
