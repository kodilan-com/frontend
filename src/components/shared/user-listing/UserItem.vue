<script>
import userDetail from '../../../mixins/userDetail';
import image from '../../../mixins/image';
import DeveloperProposalModal from '../DeveloperProposalModal';

export default {
  mixins: [userDetail, image],
  components: {
  },
  methods: {
    handleDeveloperClick(event) {
      event.preventDefault();
      this.$modal.show(DeveloperProposalModal, {
        developer: this.user,
      }, {
        name: 'developer-proposal-modal',
      });
    },
  },
};
</script>

<template>
  <li>
    <a href="#" @click="handleDeveloperClick">
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
          <div class="clearfix" />
        </div>
        <div class="date">
          {{ timeago }}
        </div>
        <div class="button-container">
          <button type="button" class="button">Teklif Ver</button>
        </div>
      </div>
      <div class="clearfix" />
    </a>
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
    left: 34px;
  }

  .button-container {
    text-align: end;
  }

  p {
    display: block;
  }
}
</style>
