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
      this.$validator.validate().then(result => {
        if (result) {
          this.createJob(this.post);
        }
      });
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
        <div class="form-group" :class="{ 'has-error' : errors.has('position') }">
          <label class="form-label" for="position">Pozisyon <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="position" name="position" v-validate="'required'" v-model="post.position"/>
          <p class="form-input-hint" v-show="errors.has('position')">{{ errors.first('position') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('description') }">
          <label class="form-label" for="details">İlan Detayları <i>(Zorunlu)</i></label>
          <textarea class="form-input" type="text" id="details" name="description" v-validate="'required'" v-model="post.description"></textarea>
          <p class="form-input-hint" v-show="errors.has('description')">{{ errors.first('description') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('location') }">
          <label class="form-label" for="location">Lokasyon <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="location" name="location" v-validate="'required'" v-model="post.location"/>
          <p class="form-input-hint" v-show="errors.has('location')">{{ errors.first('location') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('applyUrl') }">
          <label class="form-label" for="applyUrl">Başvuru URL <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="applyUrl" name="applyUrl" v-validate="'required|url'" v-model="post.applyUrl"/>
          <p class="form-input-hint" v-show="errors.has('applyUrl')">{{ errors.first('applyUrl') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('tags') }">
          <label class="form-label" for="tags">Etiketler <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="tags" name="tags" v-validate="'required'" v-model="post.tags"/>
          <p class="form-input-hint" v-show="errors.has('tags')">{{ errors.first('tags') }}</p>
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
        <div class="form-group" :class="{ 'has-error' : errors.has('name') }">
          <label class="form-label" for="name">Adı <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="name" name="name" v-validate="'required'" v-model="post.company.name"/>
          <p class="form-input-hint" v-show="errors.has('name')">{{ errors.first('name') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('email') }">
          <label class="form-label" for="email">Email Adresi <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="email" name="email" v-validate="'required|email'" v-model="post.company.email"/>
          <p class="form-input-hint" v-show="errors.has('email')">{{ errors.first('email') }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error' : errors.has('logo') }">
          <label class="form-label" for="logo">Logo <i>(Zorunlu)</i></label>
          <input class="form-input" type="text" id="logo" name="logo" v-validate="'required|url'" v-model="post.company.logo"/>
          <p class="form-input-hint" v-show="errors.has('logo')">{{ errors.first('logo') }}</p>
        </div>
        <div class="form-group">
          <label class="form-label" for="twitter">Twitter Hesabı</label>
          <div class="input-group">
              <span class="input-group-addon">https://twitter.com/</span>
              <input type="text" class="form-input" id="twitter" v-model="post.company.twitter">
            </div>
        </div>
      </div>
      <div class="panel-footer">
        <button @click="save" type="submit" class="btn btn-primary">Gönder</button>
      </div>
    </div>
  </div>
</template>
