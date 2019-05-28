<script>
import { mapState, mapActions } from 'vuex';
import allLocations from '../../assets/data/locations';

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
      return this.showAll ? allLocations : this.availableLocations;
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
