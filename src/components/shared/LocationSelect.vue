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
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
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
    syncValue() {
      if (this.value) this.selected = this.value;
    },
  },
  watch: {
    value() {
      // Here's why we use if condition:
      // When a change occurs, the value is emit to up.
      // When the value above changes, we do not want this watcher to work unnecessarily.
      if (this.selected !== this.value) this.syncValue();
    },
  },
  created() {
    this.fetchAvailableLocations();
    this.syncValue();
  },
};
</script>

<template>
  <multiselect
    :class="{ 'is-searchable': searchable }"
    v-model="selected"
    :options="locations"
    :searchable="searchable"
    :close-on-select="true"
    :show-labels="false"
    placeholder="Şehir seçiniz..."
    @input="handleChange"
  />
</template>
