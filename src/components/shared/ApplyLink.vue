<script>
import { mapActions } from 'vuex';

/* eslint-disable vue/singleline-html-element-content-newline */
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
  },
  methods: {
    ...mapActions(['saveClickLog']),
    handleEmailApplyClick() {
      this.saveClickLog({
        action: 'post_apply_email',
        post_id: this.post.id,
        company_id: this.post.company.id,
      });

      return true;
    },
    handleWebApplyClick() {
      this.saveClickLog({
        action: 'post_apply_web',
        post_id: this.post.id,
        company_id: this.post.company.id,
      });

      return true;
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
      class="button tag-apply-link"
      @click="handleEmailApplyClick"
    >
      <i class="fa fa-envelope-o" /> E-posta ile başvur
    </a>
    <a
      v-if="post.apply_url"
      :href="post.apply_url"
      target="_blank"
      class="button tag-apply-link"
      @click="handleWebApplyClick"
    >
      <i v-if="post.apply_email" class="fa fa-link" /> Site üzerinden başvur
    </a>
    <span class="small">
      İlan başvurunuzda <router-link to="/">kodilan.com</router-link>'a referans vererek
      bize katkıda bulunabilirsiniz.
    </span>
  </div>
</template>

<style lang="scss">
.small {
  font-size: 13px;
  opacity: .8;
}
</style>
