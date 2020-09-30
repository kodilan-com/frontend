<script>
import { mapState, mapActions } from 'vuex';

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
      type: Object,
      required: false,
      default: null,
    },
    showDeveloperLocations: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      selected: null,
      options: [],
    };
  },
  computed: {
    ...mapState([
      'availableLocations',
      'locationList',
      'developerLocations',
    ]),
    locations() {
      if (this.showDeveloperLocations) {
        return this.developerLocations;
      }

      return this.showAll ? this.locationList : this.availableLocations;
    },
  },
  methods: {
    ...mapActions([
      'fetchAvailableLocations',
      'fetchAllLocations',
      'fetchDeveloperLocations',
    ]),
    handleChange(value) {
      this.$emit('input', value);
    },
    syncValue() {
      if (this.value) {
        this.selected = this.value;
      }
    },
    searchChange(text) {
      if (text.trim() === '') {
        this.options = this.locations;

        return;
      }

      this.options = this.locations.filter(
        l => (l.name.toLocaleLowerCase('tr').indexOf(text.toLocaleLowerCase('tr')) > -1),
      );
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
    this.syncValue();
    this.fetchAvailableLocations();
    this.fetchAllLocations();
    this.fetchDeveloperLocations();
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
    :internal-search="false"
    label="name"
    placeholder="Şehir seçiniz..."
    @input="handleChange"
    @search-change="searchChange"
  >
    <div slot="noResult">
      Aramanızla eşleşen bir sonuç bulunamadı.
    </div>
  </multiselect>
</template>
