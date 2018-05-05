<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    }
  },
};
</script>

<template>
  <div>
    <div
      @click="toggle"
      class="tile tile-centered"
    >
      <div class="tile-icon">
        <figure class="avatar avatar-lg">
          <img
            :src="post.company.logo"
            :alt="post.company.name"
          />
        </figure>
      </div>
      <div class="tile-content">
        <p class="tile-title">{{post.position}}</p>
        <p class="tile-subtitle text-gray">
          <router-link :to="`companies/${post.company.name}`">
            {{post.company.name}}
          </router-link>
        </p>
        <span
          v-for="tag in post.tags"
          :key="tag.id"
          class="label label-rounded label-secondary"
        >
          <router-link :to="`categories/${tag.slug}`">
            {{tag.title}}
          </router-link>
        </span>
      </div>
      <div class="tile-action">
        <a
          :href="post.applyUrl"
          class="btn btn-primary btn-sm"
          target="_blank"
        >
          Başvur
        </a>
      </div>
    </div>
    <div
      v-if="isExpanded"
      class="details"
    >
      <p>
        {{post.description}}
      </p>
    </div>
  </div>
</template>
