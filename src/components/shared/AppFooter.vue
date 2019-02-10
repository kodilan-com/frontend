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
            Kodilan.com ilan yayınlama sitesidir.
            Başvurular ilgili firmaya direkt olarak yapılmakta olup
            Kodilan.com üzerinden hiçbir veri gönderilmemektedir.<br>
            © Copyright {{ new Date().getFullYear() }} <router-link to="/">
              kodilan.com
            </router-link>. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
