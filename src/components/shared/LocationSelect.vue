<script>
import { mapState, mapActions } from 'vuex';
import Multiselect from 'vue-multiselect'
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
  <multiselect
    v-model="value"
    :options="locations"
    :searchable="false"
    :close-on-select="false"
    :show-labels="false"
    placeholder="Şehir seçiniz..."
    @input="handleChange(value)"
  />
  <select
    v-bind="$attrs"
    ref="select"
    @change="handleChange"
  >
    <option
      :value="location"
      :key="location"
    >
      {{ location }}
    </option>
  </select>
</template>
