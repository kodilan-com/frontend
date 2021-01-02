<script>
const MAX_LENGTH = 400;

export default {
  props: {
    username: { type: String, required: true },
    profile: { type: Object, required: true },
  },
  data() {
    return {
      isReadMoreVisible: false,
    };
  },
  computed: {
    publicPageUrl() {
      return `https://superpeer.com/kodilan/${this.username}?via=r.kodilan`;
    },
    description() {
      const original = this.profile.longDescription;

      return this.isReadMoreVisible ? original.slice(0, MAX_LENGTH) : original;
    },
  },
  mounted() {
    this.isReadMoreVisible = this.profile.longDescription.length > MAX_LENGTH;
  },
};
</script>

<template>
  <div class="wrapper">
    <img :src="profile.avatarUrl">
    <div class="resumes-list-content">
      <h4>
        <a :href="publicPageUrl" class="url" target="_blank" rel="noopener noreferrer">
          {{ profile.firstName }} {{ profile.lastName }}
        </a>
        <span class="margin-bottom-0">{{ profile.shortDescription }}</span>
        <a class="button action-button" :href="publicPageUrl" target="_blank">Randevu Al</a>
      </h4>
      <span class="description">
        {{ description }} <a href="#" class="read-more" v-if="isReadMoreVisible" @click.prevent="isReadMoreVisible = false">devamını oku...</a>
      </span>
      <a class="button mobile-action-button" :href="publicPageUrl" target="_blank">Randevu Al</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  color: #808080;
  height: 100%;
  display: block;
  padding-right: 35px;
  line-height: 1.5;
}

a.button {
  display: inline;
  color: #fff;
}

.description {
  white-space: pre-line;
  display: block;
}

.action-button {
  position: absolute;
  top: 42px;
  padding: 4px 22px 0;
  right: 0;
  width: auto;
  height: 42px;
}

.mobile-action-button {
  margin-top: 20px;
  display: block;
  max-width: 88px;
}

.url, .read-more {
  color: #26ae61;
}

.read-more {
  display: inline;
}

@media only screen and (max-width: 767px) {
  a.button.action-button {
    display: none;
  }

  a.button.mobile-action-button {
    display: block;
  }
}

@media only screen and (min-width: 767px) {
 a.button.action-button {
    display: inline;
  }

  a.button.mobile-action-button {
    display: none;
  }
}
</style>
