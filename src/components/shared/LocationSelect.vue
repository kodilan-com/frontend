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
    searchable: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState(['availableLocations']),
    locations() {
      return this.showAll ? allLocations : this.availableLocations;
    },
  },
  methods: {
    ...mapActions(['fetchAvailableLocations']),
    handleChange(value) {
      this.$emit('input', value);
    },
  },
  created() {
    this.fetchAvailableLocations();
  },
};
</script>

<template>
  <multiselect
    v-model="selected"
    :options="locations"
    :searchable="searchable"
    :close-on-select="true"
    :show-labels="false"
    placeholder="Şehir seçiniz..."
    @input="handleChange"
  />
</template>
