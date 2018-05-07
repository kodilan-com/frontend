<script>
import { mapGetters, mapActions } from 'vuex';
import autocomplete from '../../utils/autocomplete';

export default {
  methods: {
    ...mapActions(['fetchTags']),
  },
  computed: {
    ...mapGetters(['autocompleteTags']),
  },
  mounted() {
    this.fetchTags().then(() => {
      autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
    });
  },
};
</script>

<template>
  <div class="add-job">
    <div id="titlebar" class="single submit-page">
      <div class="container">
        <div class="sixteen columns">
          <h2>
            <i class="fa fa-plus-circle"></i> Yeni İlan Ekle
          </h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sixteen columns">
        <div class="submit-page">
          <div class="notification notice closeable margin-bottom-40">
            <p>
              <span>Önemli hatırlatma!</span>
              İlan ekleyebilmek için belirtmiş olduğunuz firma ismiyle uyumlu bir e-posta adresi vermeniz gerekiyor.
              İlan ekledikten sonra doğrulama işlemi için belirtmiş olduğunuz e-posta adresine bir onay e-postası gönderilecektir.
              İlanınız size gelen e-postadaki doğrulama linkine tıkladıktan sonra yayına alınacaktır.
            </p>
          </div>
          <div class="form">
            <h5>E-posta Adresiniz</h5>
            <input class="search-field" type="text" placeholder="mail@example.com" />
          </div>
          <div class="form">
            <h5>Pozisyon</h5>
            <input class="search-field" type="text" />
          </div>
          <div class="form">
            <h5>İlan Açıklaması</h5>
            <textarea class="wysiwyg" name="summary" cols="40" rows="3" id="summary"></textarea>
          </div>
          <div class="form">
            <h5>Lokasyon</h5>
            <input class="search-field" type="text" />
            <p class="note">Bu ilan uzaktan çalışmaya izin veriyorsa lokasyon olarak Remote yazabilirsiniz.</p>
          </div>
          <div class="form">
            <h5>Job Type</h5>
            <select>
              <option value="1">Tam zamanlı</option>
              <option value="2">Yarı zamanlı</option>
              <option value="3">Stajyer</option>
              <option value="4">Freelance</option>
            </select>
          </div>
          <div class="form">
            <h5>Etiketler</h5>
            <input ref="tagsInput" class="tags-input" type="text" data-multiple />
            <p class="note">Bu pozisyon için gerekli olan yeti ve teknolojileri seçebilirsiniz ya da ekleme yapabilirsiniz.</p>
          </div>
          <div class="form">
            <h5>Başvuru linki</h5>
            <input type="text" />
            <p class="note">Bu ilana başvurmak için kendi sitenize bir link ya da bir e-posta adresi girebilirsiniz.</p>
          </div>

          <div class="divider">
            <h3>Firma Bilgileri</h3>
          </div>
          <div class="form">
            <h5>Firma adı</h5>
            <input type="text" />
          </div>
          <div class="form">
            <h5>Website</h5>
            <input type="text" placeholder="https://" />
          </div>
          <div class="form">
            <h5>Logo URL</h5>
            <input type="text" placeholder="https://" />
            <p class="note">Logo kare olarak gösterilecektir.</p>
          </div>
          <div class="form">
            <h5>Twitter Kullanıcı adı <span>(opsiyonel)</span></h5>
            <input type="text" placeholder="@twitter" />
          </div>
          <div class="form">
            <h5>Linkedin URL<span>(opsiyonel)</span></h5>
            <input type="text" placeholder="https://" />
          </div>

          <div class="preview-button">
            <a href="#" class="button big margin-top-5">
              Önizleme <i class="fa fa-arrow-circle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.add-job {
  .preview-button {
    text-align: right;
  }

  select {
    height: 48px;
  }

  .awesomplete {
    width: 100%;
  }
}
</style>
