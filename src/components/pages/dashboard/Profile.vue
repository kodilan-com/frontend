<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../../shared/Loader';
import LocationSelect from '../../shared/LocationSelect';

export default {
  metaInfo: {
    title: 'Profilim | Kodilan.com',
  },
  components: {
    Loader,
    LocationSelect,
  },
  data() {
    return {
      isSaving: false,
      formData: {
        name: null,
        email: null,
        linkedin_url: null,
        location: null,
        title: null,
        password_new: null,
        password_current: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions([
      'updateUser',
      'updateLookingForJob',
      'updatePassword',
    ]),
    saveProfile(event) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      const data = {
        name: this.formData.name,
        title: this.formData.title,
        email: this.formData.email,
        linkedin_url: this.formData.linkedin_url,
        location_id: this.formData.location.id,
      };

      this.updateUser(data)
        .finally(() => {
          this.isSaving = false;
        });
    },
    savePassword(event) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      const data = {
        password_new: this.formData.password_new,
        password_current: this.formData.password_current,
        password_confirmation: this.formData.password_confirmation,
      };

      this.updatePassword(data)
        .then(() => {
          this.formData.password_new = null;
          this.formData.password_current = null;
          this.formData.password_confirmation = null;
        })
        .catch((e) => {
          const errors = this.parseErrors(e);
          this.showErrorDialog(`Lütfen gerekli alanları doldurduğunuzdan emin olunuz.${errors}`);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    showErrorDialog(text) {
      const subject = encodeURI('Hata');

      this.$modal.show('dialog', {
        text,
        title: 'Kayıt başarısız!',
        buttons: [{
          title: `<a href="mailto:info@kodilan.com?subject=${subject}" >Hata bildir!</a>`,
        },
        {
          title: 'Kapat',
        }],
      });
    },
    parseErrors(e) {
      const errors = e.response.data.errors || [];
      const details = Object.values(errors)
        .reduce((arr, err) => arr.concat(err), [])
        .map(err => `<li>${err}</li>`);

      return `<ul>${details.join('')}</ul>`;
    },
    toggleLookingForJob(event) {
      event.preventDefault();

      if (this.isSaving) {
        return;
      }

      this.isSaving = true;

      const data = {
        looking_for_job: this.user.looking_for_job_at === null,
      };

      this.updateLookingForJob(data)
        .finally(() => {
          this.isSaving = false;
        });
    },
  },
  mounted() {
    this.formData.name = this.user.name;
    this.formData.title = this.user.title;
    this.formData.email = this.user.email;
    this.formData.linkedin_url = this.user.linkedin_url;
    this.formData.location = this.user.location;
  },
};
</script>

<template>
  <div>
    <!-- Titlebar -->
    <div id="titlebar">
      <div class="row">
        <div class="col-md-12">
          <h1>Profilim</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- Profile -->
      <div class="col-lg-6 col-md-12" v-if="isSaving">
        <loader />
      </div>
      <div class="col-lg-6 col-md-12" v-else>
        <div class="dashboard-list-box margin-top-0">
          <h4 class="gray">
            Kişisel Bilgiler
          </h4>
          <div class="dashboard-list-box-static">
            <form @submit="saveProfile">
              <!-- Avatar -->
              <!-- <div class="edit-profile-photo">
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=300"
                  alt=""
                >
                <div class="change-photo-btn">
                  <div class="photoUpload">
                    <span>
                      <i class="fa fa-upload" /> Fotoğraf Yükle
                    </span>
                    <input type="file" class="upload">
                  </div>
                </div>
              </div> -->

              <!-- Details -->
              <div class="my-profile">
                <label for="name" class="margin-top-0">İsim</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  v-model="formData.name"
                  required
                >

                <label for="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  v-model="formData.email"
                  required
                >

                <label for="linkedin_url">Linkedin Profili</label>
                <input
                  type="url"
                  id="linkedin_url"
                  name="linkedin_url"
                  v-model="formData.linkedin_url"
                  placeholder="https://..."
                  required
                >

                <label for="title" class="margin-top-0">Unvan</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  v-model="formData.title"
                  minlength="1"
                  maxlength="50"
                  placeholder="Web Developer"
                >

                <label for="location">Şehir</label>
                <location-select
                  v-model="formData.location"
                  :value="formData.location"
                  :show-all="true"
                  :searchable="true"
                />
              </div>

              <button type="submit" class="button margin-top-15">
                Kaydet
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div class="col-lg-6 col-md-12" v-if="!isSaving">
        <div class="dashboard-list-box margin-top-0">
          <h4 class="gray">
            Parolanı Değiştir
          </h4>
          <div class="dashboard-list-box-static">
            <!-- Change Password -->
            <div class="my-profile">
              <form @submit="savePassword">
                <label for="password_current" class="margin-top-0">Mevcut Parola</label>
                <input
                  id="password_current"
                  name="password_current"
                  v-model="formData.password_current"
                  type="password"
                  required
                  autocomplete="current-password"
                >

                <label for="password_new">Yeni Parola</label>
                <input
                  id="password_new"
                  name="password_new"
                  v-model="formData.password_new"
                  type="password"
                  required
                  autocomplete="new-password"
                >

                <label for="password_confirmation">Yeni Parolanı Doğrula</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  v-model="formData.password_confirmation"
                  type="password"
                  required
                  autocomplete="new-password"
                >

                <button class="button margin-top-15">
                  Değiştir
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- look for a job -->
      <div class="col-lg-6 col-md-12" v-if="!isSaving">
        <div class="dashboard-list-box">
          <h4 class="gray">
            İş Arıyor Musun?
          </h4>
          <div class="dashboard-list-box-static">
            <!-- Change Password -->
            <div class="my-profile" v-if="user">
              <form @submit="toggleLookingForJob">
                <p v-if="user.looking_for_job_at !== null">
                  Şu anda <strong>iş arıyorsun</strong>. Firmalar seni bulabilir ve teklif
                  verebilir ancak ismini ve çalıştığın firmaları göremez. İş arayışını
                  sonlandırmak için aşağıdaki tuşa tıkla.
                </p>
                <p v-else>
                  Şu anda <strong>iş aramıyorsun</strong>. Aşağıdaki tuşu kullanarak iş
                  aramaya başlarsan firmalar seni bulabilecek ve teklif gönderebilecek.
                  Ancak ismini ve çalıştığın firmaları göremeyecek.
                </p>
                <button type="submit" class="button button-danger margin-top-15">
                  <span v-if="user.looking_for_job_at !== null">İş Aramayı Bırak</span>
                  <span v-else>İş Aramaya Başla</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
