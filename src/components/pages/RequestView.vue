<script>
export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <div>
    <div id="titlebar" class="single">
      <div class="container">
        <div class="sixteen columns">
          <h2>My Account</h2>
        </div>
      </div>
    </div>
    <div class="my-account">
      <ul class="tabs-nav">
        <li :class="{'active': active}">
          <router-link to="/giris-yap">
            Giriş Yap
          </router-link>
        </li>
        <li :class="{'active': !active}">
          <router-link to="/kayit-ol">
            Kayıt Ol
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
