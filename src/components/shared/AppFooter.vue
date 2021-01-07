<script>
export default {
  data() {
    return {
      isBackToTopVisible: false,
      isFooterSubscribeVisible: !localStorage.getItem('subscribeClosed'),
    };
  },
  methods: {
    handleScroll() {
      this.isBackToTopVisible = window.scrollY > 540;
    },
    backToTop(){
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
  <div id="footer" :class="{ 'has-widget': isFooterSubscribeVisible }">
    <div class="container">
      <div class="seven columns">
        <h4>Hakkında</h4>
        <p>
          <router-link to="/">
            Kodilan.com
          </router-link> ilan yayınlama sitesidir.
          Başvurular ilgili firmaya direkt olarak yapılmakta olup
          <router-link to="/">
            Kodilan.com
          </router-link> üzerinden hiçbir veri gönderilmemektedir.
          Sitemizde yayınlanan ilanlar tamamen ücretsizdir ve ilan sahipleri ile sitemizin
          hiçbir ilişkisi yoktur. <br>
          Paylaşılan ilanlarda değişiklik yapma ve yayından kaldırma hakları Kodilan'a aittir.
          Görüş ve önerileriniz için <a href="mailto:info@kodilan.com">
            info@kodilan.com
          </a>
          adresine e-posta gönderebilirsiniz.
        </p>
        <div class="footer-bottom compact">
          <ul class="social-icons">
            <li>
              <a class="twitter" href="https://twitter.com/kodilancom" target="_blank">
                <i class="icon-twitter" />
              </a>
            </li>
            <li>
              <a class="github" href="https://github.com/kodilan-com/frontend" target="_blank">
                <i class="icon-github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="three columns">
        <h4>Pozisyona göre ilanlar</h4>
        <ul class="footer-links">
          <li>
            <router-link to="/etiket/frontend">
              Frontend developer ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/etiket/backend">
              Backend developer ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/etiket/mobile">
              Mobile developer ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/etiket/designer">
              Designer ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/etiket/qa">
              QA ilanları
            </router-link>
          </li>
        </ul>
      </div>
      <div class="three columns">
        <h4>Şehirlere göre ilanlar</h4>
        <ul class="footer-links">
          <li>
            <router-link to="/ilan-ara?location=İstanbul">
              İstanbul iş ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/ilan-ara?location=İzmir">
              İzmir iş ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/ilan-ara?location=Ankara">
              Ankara iş ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/ilan-ara?location=Remote">
              Uzaktan çalışmaya uygun iş ilanları
            </router-link>
          </li>
        </ul>
      </div>
      <div class="three columns">
        <h4>İlan tipine göre ilanlar</h4>
        <ul class="footer-links">
          <li>
            <router-link to="/ilan-ara/tam-zamanli">
              Tam zamanlı iş ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/ilan-ara/yari-zamanli">
              Yarı zamanlı iş ilanları
            </router-link>
          </li>
          <li>
            <router-link to="/ilan-ara/stajyer">
              Stajyer iş ilanları
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <div class="sixteen columns">
          <div class="copyrights">
            © Copyright {{ new Date().getFullYear() }}
            <router-link to="/">
              kodilan.com
            </router-link>
            Tüm hakları saklıdır.
          </div>
          <div>
            <router-link to="/">
              kodilan.com
            </router-link>
            açık kaynaklı bir girişimdir.
            <a href="https://github.com/kodilan-com/frontend" target="_blank">
              Katkıda bulunun!
            </a>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div id="backtotop" v-if="isBackToTopVisible">
        <a @click="backToTop" />
      </div>
    </transition>
  </div>
</template>
