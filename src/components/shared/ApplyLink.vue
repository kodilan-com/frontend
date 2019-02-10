<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mailToUrl() {
      const { post } = this;
      const encoded = encodeURI(`${post.company.name} ${post.position} İlan Başvurusu`);
      const body = encodeURI('\n\n\n\n-\nkodilan.com aracılığıyla gönderilmiştir.');

      return `mailto:${post.apply_email}?subject=${encoded}&body=${body}`;
    },
    urlButtonText() {
      return this.post.apply_email ? 'Site üzerinden başvur' : 'Bu pozisyona başvur';
    },
  },
};
</script>

<template>
  <div>
    <a
      v-if="post.apply_email"
      :href="mailToUrl"
      target="_blank"
      class="button"
    >
      <i class="fa fa-envelope-o" /> E-posta ile başvur
    </a>
    <a
      v-if="post.apply_url"
      :href="post.apply_url"
      target="_blank"
      class="button"
    >
      <i
        v-if="post.apply_email"
        class="fa fa-link"
      /> {{ urlButtonText }}
    </a>
    <span class="small">
      İlan başvurunuzda <router-link to="/">
        kodilan.com
      </router-link>'a referans vererek
      bize katkıda bulunabilirsiniz.
    </span>
  </div>
</template>

<style lang="scss">
.small {
  font-size: 12px;
  opacity: .8;
}
</style>
