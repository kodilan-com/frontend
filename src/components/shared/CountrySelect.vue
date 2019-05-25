<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['locations']),
  },
  methods: {
    ...mapActions(['fetchLocations']),
    handleChange() {
      this.$emit('input', this.$refs.select.value);
    },
  },
  created() {
    this.fetchLocations();
  },
};
</script>

<template>
  <select
    v-bind="$attrs"
    ref="select"
    @change="handleChange"
  >
    <option value="" selected>
      Şehir seçiniz...
    </option>
    <option
      v-for="location in locations"
      :value="location"
      :key="location"
    >
      {{ location }}
    </option>
  </select>
</template>
