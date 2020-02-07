<script>
import { mapActions } from 'vuex';
import { normalizeUrl } from '../../utils/url';


export default {
  data() {
    return {
      formData: {
        company_name: '',
        company_email: '',
        company_logo: '',
        company_www: '',
        company_twitter: '',
        company_linkedin: '',
      },
      rules: {
        company_name: { required: true, message: 'Firma adı boş bırakılamaz.' },
        company_email: { required: true, message: 'E-posta adresi boş bırakılamaz.' },
        company_logo: { required: true, message: 'Logo URL boş bırakılamaz.' },
        company_www: { required: true, message: 'Website boş bırakılamaz.' },
      },
    };
  },
  methods: {
    getPostData() {
      const postData = {
        ...this.formData,
      };

      postData.company_twitter = (postData.company_twitter || '').replace('@', '');
      postData.company_www = normalizeUrl(postData.company_www);
      postData.apply_url = normalizeUrl(postData.apply_url);

      return postData;
    },
    ...mapActions(['createCompany']),
    submitCompany() {
      this.createCompany(this.getPostData())
        .then(res => console.log(res))
        .catch(error => console.log(error.response.data));
    },
  },
};
</script>

<template>
  <div>
    <div id="titlebar" class="single">
      <div class="container">
        <div class="sixteen columns">
          <h2>Firma Oluştur</h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sixteen">
        <div class="submit-page">
          <div class="divider">
            <h3>Firma Bilgileri</h3>
          </div>
          <div class="form">
            <h5>Firma adı</h5>
            <input v-model="formData.company_name" type="text">
          </div>
          <div class="form">
            <h5>Email Adresi</h5>
            <input v-model="formData.company_email" type="text">
          </div>
          <div class="form">
            <h5>Website</h5>
            <input v-model="formData.company_www" type="text" placeholder="https://">
          </div>
          <div class="form">
            <h5>Logo URL</h5>
            <input v-model="formData.company_logo" type="text" placeholder="https://">
            <p class="note">
              Logo kare olarak gösterilecektir.
            </p>
          </div>
          <div class="form">
            <h5>Twitter Kullanıcı adı <span>(opsiyonel)</span></h5>
            <input v-model="formData.company_twitter" type="text" placeholder="@twitter">
          </div>
          <div class="form">
            <h5>Linkedin URL <span>(opsiyonel)</span></h5>
            <input v-model="formData.company_linkedin" type="text" placeholder="https://">
          </div>
          <div class="button-container">
            <button @click="submitCompany" class="button big margin-top-5" type="button">
              Şirket Oluştur <i class="fa fa-arrow-circle-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
