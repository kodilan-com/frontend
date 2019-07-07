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
      frequencyModel: {
        value: 'weekly',
        text: 'haftalık',
      },
      frequencyOptions: [
        {
          value: 'weekly',
          text: 'haftalık',
        },
        {
          value: 'monthly',
          text: 'aylık',
        },
      ],
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
      this.frequency = this.frequencyModel.value;

      const { frequency, name, email } = this;

      this.subscribe({
        frequency,
        name,
        email,
      })
        .then(() => {
          this.showDialog('Email listesine kaydınız gerçekleştirildi.');
          this.close();
        })
        .catch((e) => {
          const details = Object.values(e.response.data.errors || [])
            .map(r => `<li>${r[0]}</li>`);
          this.showDialog('Hata: Kaydınız gerçekleştirilemedi.', `<ul>${details || ''}</ul>`);
        });
    },
    showDialog(title, text, buttons = [{ title: 'Kapat' }]) {
      this.$modal.show('dialog', {
        title,
        text,
        buttons,
      });
    },
    close() {
      this.isClosed = true;
      localStorage.setItem('subscribeClosed', true);
    },
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    :class="{ fixed: fixed }"
    class="subscribe-widget"
  >
    <form @submit.prevent="handleSubscribe">
      <span>Güncel iş ilanlarını</span>
      <div class="subscribe--select">
        <multiselect
          v-model="frequencyModel"
          :options="frequencyOptions"
          label="text"
          :searchable="false"
          :close-on-select="true"
        />
      </div>
      <span>olarak almak için</span>
      <input type="text" v-model="name" placeholder="İsim soyisim" class="username">
      <input type="text" v-model="email" placeholder="Email">
      <button class="button" @click="handleSubscribe">
        Abone ol!
      </button>
      <span
        v-if="fixed"
        class="close"
        @click="close"
      >
        Bir daha gösterme :(
      </span>
    </form>
  </div>
</template>

<style lang="scss">
  .subscribe-widget {
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;

  .subscribe--select {
    text-align: left;
  }

  &.fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 0;
    z-index: 10000;
    width: 100%;
    height: 70px;
    color: #fff;
    background: #231F20;
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

      select,
      .subscribe--select {
        display: inline-block;
        width: 100px;
        margin: 0 6px;
        color: #202020;
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

  @media only screen and (max-width: 998px) {
    .subscribe-widget.fixed {
      height: 80px;
    }
    .subscribe-widget form {
      margin-top: 10px;
    }
    .subscribe-widget.fixed form span.close {
      top: 7px;
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
