<script>
import { mapGetters, mapActions } from 'vuex';
import { VueEditor } from 'vue2-editor';
import LocationSelect from '../shared/LocationSelect';
import autocomplete from '../../utils/autocomplete';
import { defaultEditorToolbar } from '../../config';
import { JOB_TYPES_FOR_DROPDOWN } from '../../store/constants';
import AdvertForm from './AdvertForm';

export default {
  components: {
    VueEditor,
    AdvertForm,
    LocationSelect,
  },
  data() {
    return {
      postDetail: {},
      type: JOB_TYPES_FOR_DROPDOWN[0],
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  computed: {
    editorToolbar() {
      return defaultEditorToolbar;
    },
  },
  methods: {
    ...mapActions(['fetchPostDetail', 'fetchTags']),
  },
  mounted() {
    this.$store.dispatch('fetchPostDetail')
      .then((res) => {
        console.log(res);
        this.postDetail = res.data.data[0];
      })
      .catch(error => console.log(error.response.data));

    this.fetchTags()
      .then(() => {
        autocomplete.init(this.$refs.tagsInput, this.autocompleteTags);
      });
  },
};
</script>

<template>
  <div class="add-job">
    <div
      id="titlebar"
      class="single submit-page"
    >
      <div class="container">
        <div class="sixteen columns">
          <h1>
            <i class="fa fa-plus-circle" /> İlanı Düzenle
          </h1>
        </div>
      </div>
    </div>
    <advert-form
      :formData = this.postDetail />
    <div class="button-container">
      <button class="button big margin-top-5" type="button">
        Kaydet <i class="fa fa-arrow-circle-right" />
      </button>
    </div>
  </div>
</template>
