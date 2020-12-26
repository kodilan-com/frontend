<script>
export default {
  data() {
    return {
      isVisible: !!(localStorage.getItem('isTopbarClosed')),
    };
  },
  methods: {
    handleClickClose() {
      this.isVisible = true;
      localStorage.setItem('isTopbarClosed', true);
    },
  },
};
</script>

<template>
  <section class="component is-topbar" v-if="!isVisible">
    <div class="container">
      <div class="topbar--cols">
        <a
          href="https://webrazzi.com/odul/2020/"
          target="_blank"
          class="topbar--cols__elm is-icon"
        >
          <i class="fa fa-bullhorn" />
        </a>
        <div class="topbar--cols__elm is-content">
          <p>
            Kodilan, Webrazzi 2020 Ödülleri'nde "Yılın İş İlan Sitesi" kategorisinde finale kaldı. Oy vererek bize destek olmak ister misiniz?
            <a href="https://webrazzi.com/odul/2020/" target="_blank">
              Webrazzi Ödülleri 2020
            </a>
          </p>
        </div>
        <a
          href="#"
          @click.prevent="handleClickClose"
          title="Bir daha gösterme."
          class="topbar--cols__elm is-action"
        >
          <i class="fa fa-close" />
        </a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  $this: 'topbar';

  section.component {
    &.is-#{$this} {
      background: #231F20;
      color: #fff;

      a {
        &:hover {
          color: #fff;
        }
      }

      p {
        margin: 0;
      }

      .#{$this}--cols {
        display: flex;
        align-items: center;

        &__elm {
          padding: 8px;

          &.is-content {
            flex: 1;

            @media (max-width: 767px) {
              text-align: center;
            }
          }
          &.is-icon {
            font-size: 24px;
          }

          &.is-action {
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
