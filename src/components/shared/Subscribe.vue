<script>
import { mapActions } from 'vuex';

export default {
  props: {
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      frequency: 'weekly',
      name: '',
      email: '',
      isClosed: false,
    };
  },
  computed: {
    isVisible() {
      if (!this.fixed) {
        return true;
      }

      return !this.isClosed && !localStorage.getItem('subscribeClosed');
    },
  },
  methods: {
    ...mapActions(['subscribe']),
    handleSubscribe() {
      const { frequency, name, email } = this;

      this.subscribe({ frequency, name, email })
        .then(console.log);
    },
    close() {
      this.isClosed = true;
      localStorage.setItem('subscribeClosed', true);
    },
  },
}
</script>

<template>
  <div
    v-if="isVisible"
    :class="{ fixed: fixed }"
    class="subscribe-widget"
  >
    <span>Yeni iş ilanlarını</span>
    <select v-model="frequency">
      <option disabled value="daily">günlük</option>
      <option value="weekly">haftalık</option>
      <option value="monthly">aylık</option>
    </select>
    <span>olarak almak için</span>
    <input type="text" v-model="name" placeholder="İsim soyisim" class="username" />
    <input type="text" v-model="email" placeholder="Email" />
    <button class="button" @click="handleSubscribe">Abone ol!</button>
    <span
      v-if="fixed"
      class="close"
      @click="close"
    >Bir daha gösterme :(</span>
  </div>
</template>

<style lang="scss">
.subscribe-widget {
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;

  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0;
    z-index: 10000;
    width: 100%;
    height: 70px;
    color: #fff;
    background: #202020;
    border-top: 1px solid #474646;
    line-height: 50px;

    input[type=text] {
      margin-right: 6px;
      width: 120px;
      display: inline;

      &.username {
        margin-left: 6px;
      }
    }

    select {
      display: inline;
      width: 100px;
      margin: 0 6px;
    }

    .close {
      display: block;
      color: #5c5c5c;
      font-size: 12px;
      position: absolute;
      top: 10px;
      right: 10px;
      line-height: 12px;
      cursor: pointer;

      &:hover {
        color: #ccc;
      }
    }
  }

  input[type=text] {
    padding: 11px 10px;
  }

  select {
    height: 42px;
  }

  button {
    &:hover {
      background-color: #26ae61;
    }
  }
}

@media only screen and (max-width: 768px) {
  #footer {
    padding-bottom: 10px !important;
  }

  .subscribe-widget.fixed {
    display: none;
  }
}

@media only screen and (min-width: 990px) {
  .subscribe-widget input[type=text] {
    width: 140px !important;
  }
}

@media only screen and (min-width: 1180px) {
  .subscribe-widget input[type=text] {
    width: 180px !important;
  }
}
</style>
