<script>
import countries from '../../assets/data/countries';

export default {
  methods: {
    handleChange() {
      this.$emit('input', this.$refs.select.value);
    },
  },
  created() {
    this.countries = countries;
  },
};
</script>

<template>
  <select
    v-bind="$attrs"
    ref="select"
    @change="handleChange"
  >
    <option value="" selected>Şehir seçiniz...</option>
    <option
      v-for="country in countries"
      :value="country.name"
      :disabled="country.disabled"
      :key="country.id"
    >
      {{ country.name }}
    </option>
  </select>
</template>
