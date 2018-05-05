<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      post: {
        position: "",
        description: "",
        location: "",
        applyUrl: "",
        company: {
          name: "",
          email: "",
          logo: "",
          twitter: ""
        },
        tags: ""
      },
    }
  },
  methods: {
    ...mapActions(['createJob']),
    save() {
      this.createJob(this.post);
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>İlan Bilgileri</h3>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label class="form-label" for="position">Pozisyon</label>
          <input class="form-input" type="text" id="position" v-model="post.position"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="details">İlan detayı</label>
          <textarea class="form-input" type="text" id="details" v-model="post.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label" for="location">Lokasyon</label>
          <input class="form-input" type="text" id="location" v-model="post.location"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="applyUrl">Başvuru URL</label>
          <input class="form-input" type="text" id="applyUrl" v-model="post.applyUrl"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="tags">Etiketler</label>
          <input class="form-input" type="text" id="tags" v-model="post.tags"/>
        </div>
      </div>
      <div class="panel-footer"></div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <h3>Firma Bilgileri</h3>
        </div>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label class="form-label" for="name">Adı</label>
          <input class="form-input" type="text" id="name" v-model="post.company.name"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email Adresi</label>
          <input class="form-input" type="text" id="email" v-model="post.company.email"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="logo">Logo</label>
          <input class="form-input" type="text" id="logo" v-model="post.company.logo"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Twitter Hesabı</label>
          <div class="input-group">
              <span class="input-group-addon">https://twitter.com/</span>
              <input type="text" class="form-input" v-model="post.company.twitter">
            </div>
        </div>
      </div>
      <div class="panel-footer">
        <button @click="save" type="submit" class="btn btn-primary">Gönder</button>
      </div>
    </div>
  </div>
</template>
