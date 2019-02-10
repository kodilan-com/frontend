<script>
export default {
  data() {
    return {
      isBackToTopVisible: false,
    }
  },
  methods: {
    handleScroll() {
      this.isBackToTopVisible = window.scrollY > 540 ? true : false;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
}
</script>

<template>
  <div id="footer">
    <div class="container">
      <div class="footer-bottom">
        <div class="sixteen columns">
          <ul class="social-icons">
            <li>
              <a
                class="twitter"
                target="_blank"
                href="https://twitter.com/kodilancom"
              >
                <i class="icon-twitter" />
              </a>
            </li>
          </ul>
          <div class="copyrights">
            Kodilan.com ilan yayınlama sitesidir. Başvurular ilgili firmaya direkt olarak yapılmakta
            olup Kodilan.com üzerinden hiçbir veri gönderilmemektedir. Görüş ve önerileriniz için
            <a href="mailto:info@kodilan.com">info@kodilan.com</a>
            adresine e-posta gönderebilirsiniz. <br /><br />
            © Copyright {{ new Date().getFullYear() }} <router-link to="/">
              kodilan.com
            </router-link>. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div id="backtotop" v-if="isBackToTopVisible">
        <a href="#"></a>
      </div>
    </transition>
  </div>
</template>
