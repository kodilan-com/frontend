<script>
import { mapActions } from 'vuex';
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
      locations: null,
      options: [],
    };
  },
  methods: {
    ...mapActions(['fetchAvailableLocations']),
    handleChange(value) {
      this.$emit('input', value);
    },
    syncValue() {
      if (this.value) this.selected = this.value;
    },
    searchChange(text) {
      this.options = text.trim()
        ? this.locations.filter(l => l.toLocaleLowerCase().search(text.toLocaleLowerCase()) !== -1)
        : this.locations;
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
    this.fetchAvailableLocations().then(() => {
      this.locations = this.showAll ? allLocations : this.$store.state.availableLocations;
      this.options = this.locations;
    });
    this.syncValue();
  },
};
</script>

<template>
  <multiselect
    :class="{ 'is-searchable': searchable }"
    v-model="selected"
    :options="options"
    @search-change="searchChange"
    :internal-search="false"
    :searchable="searchable"
    :close-on-select="true"
    :show-labels="false"
    placeholder="Şehir seçiniz..."
    @input="handleChange"
  >
    <div slot="noResult">
      Aramanızla eşleşen bir sonuç bulunamadı.
    </div>
  </multiselect>
</template>
