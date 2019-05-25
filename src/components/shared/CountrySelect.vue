<script>
import { mapState, mapActions } from 'vuex';
import countries from '../../assets/data/countries';

export default {
  props: {
    showAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState(['availableLocations']),
    locations() {
      return this.showAll ? countries : this.availableLocations;
    },
  },
  methods: {
    ...mapActions(['fetchAvailableLocations']),
    handleChange() {
      this.$emit('input', this.$refs.select.value);
    },
  },
  created() {
    this.fetchAvailableLocations();
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
