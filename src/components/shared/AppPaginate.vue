<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    currentPage() {
      return this.meta.current_page;
    },
    showLastPageButton() {
      return this.currentPage + 3 < this.meta.last_page;
    },
    showFirstPageButton() {
      return this.currentPage > 4;
    },
  },
  methods: {
    pageChange(page = 1) {
      this.$emit('input', page);
    },
  },
};
</script>

<template>
  <div class="pagination" v-if="meta.last_page > 1">
    <ul>
      <template v-if="showFirstPageButton">
        <li class="blank">
          <a href="#" @click.prevent="pageChange(1)">İlk</a>
        </li>
        <li class="blank">
          ...
        </li>
      </template>
      <template v-for="i in [3,2,1]">
        <li :key="`paginate_prev-${i}`" v-if="currentPage - i > 0">
          <a href="#" @click.prevent="pageChange(currentPage - i )">
            {{ currentPage - i }}
          </a>
        </li>
      </template>
      <li>
        <a href="#" class="current-page">{{ currentPage }}</a>
      </li>
      <template v-for=" i in 3">
        <li :key="`paginate_next-${i}`" v-if="currentPage + i <= meta.last_page">
          <a href="#" @click.prevent="pageChange(currentPage + i)">
            {{ currentPage + i }}
          </a>
        </li>
      </template>
      <template v-if="showLastPageButton">
        <li class="blank">
          ...
        </li>
        <li class="blank">
          <a href="#" @click.prevent="pageChange(meta.last_page)">Son</a>
        </li>
      </template>
    </ul>
  </div>
</template>
