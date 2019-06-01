<template>  
  <div class="multi-select-wrapper">
    <multiselect v-model="value" track-by="name" placeholder="Şehir Seçiniz" selectLabel="Seçmek için tıklayınız" label="name" :options="options" :multiple="true" :taggable="true" @select="handleChange"></multiselect>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import allLocations from '../../assets/data/locations';
  import Multiselect from 'vue-multiselect'
  export default {
    props: {
      showAll: {
        type: Boolean,
        required: false,
        default: false,
      }
    },
    components: { 
      Multiselect 
    },
    data () {
      return {
        value: [],
        options: [],
        result: []
      }
    },
    computed: {
      ...mapState([
        'availableLocations'
      ]),
      locations() {
        return this.showAll ? allLocations : this.availableLocations;
      },
    },
    created() {
      this.setSearchData()
      this.fetchAvailableLocations();
    },
    methods: {
      ...mapActions(['fetchAvailableLocations']),
      handleChange(e){
        this.result.push(e.name);
        this.$emit('input', this.result);
      },
      setSearchData(){
        if(this.$route.query.location){
          let location = this.$route.query.location.split(',');
          this.value = this.setOptionsOrValue(location);
          this.result = (this.value).map(s => s.name)
        } 
        this.options = this.setOptionsOrValue(this.locations);
      },
      setOptionsOrValue(data){
        let options = [];
        data.map((s, i) => {
          options.push({
            name: s
          })
        })
        return options;
      }
    }
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
