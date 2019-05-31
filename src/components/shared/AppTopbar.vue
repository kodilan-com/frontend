<script>
export default {
  data() {
    return {
      isActive: localStorage.getItem('kodIlanTopbarStatus') !== 'closed',
    };
  },
  methods: {
    handleClickClose() {
      this.isActive = false;
      localStorage.setItem('kodIlanTopbarStatus', 'closed')
    },
  },
};
</script>


<template>
  <section class="component is-topbar" v-if="isActive">
    <div class="container">
      <div class="topbar--cols">
        <a
          href="https://github.com/kodilan-com/frontend"
          target="_blank"
          class="topbar--cols__elm is-icon"
        >
          <i class="fa fa-github" />
        </a>
        <div class="topbar--cols__elm is-content">
          <p>
            Kodilan.com açık kaynak bir girişimdir.
            <a href="https://github.com/kodilan-com/frontend" target="_blank">
              Katkıda bulunun!
            </a>
          </p>
        </div>
        <a
          href="javascript:;"
          @click="handleClickClose"
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
          color: #4078c0;
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
