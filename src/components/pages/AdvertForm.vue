<script>
import { VueEditor } from 'vue2-editor';
import LocationSelect from '../shared/LocationSelect';
import { defaultEditorToolbar } from '../../config';
import { JOB_TYPES_FOR_DROPDOWN } from '../../store/constants';

export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  components: {
    LocationSelect,
    VueEditor,
  },
  data() {
    return {
      type: JOB_TYPES_FOR_DROPDOWN[0],
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    };
  },
  computed: {
    editorToolbar() {
      return defaultEditorToolbar;
    },
  },
};
</script>

<template>
  <div>
    <div
      class="container"
    >
      <div class="sixteen columns">
        <div class="submit-page">
          <div class="form">
            <h5>Pozisyon</h5>
            <input v-model="formData.position" class="search-field" type="text">
          </div>
          <div class="form">
            <h5>İlan Açıklaması</h5>
            <vue-editor v-model="formData.description" :editor-toolbar="editorToolbar" />
          </div>
          <div class="form">
            <h5>Lokasyon</h5>
            <location-select
              v-model="formData.location"
              :value="formData.location"
              :show-all="true"
              :searchable="true"
            />
            <p class="note">
              Uzaktan çalışmaya elverişli bir ilansa Remote seçiniz.
            </p>
          </div>
          <div class="form">
            <h5>İlan Tipi</h5>
            <multiselect
              v-model="type"
              :options="typeOptions"
              label="text"
              :searchable="false"
              :close-on-select="true"
              placeholder="Seçiniz..."
            />
          </div>
          <div class="form">
            <h5>Etiketler</h5>
            <input
              v-model="formData.tags"
              ref="tagsInput"
              class="tags-input"
              type="text"
              data-multiple
            >
            <p class="note">
              Bu pozisyon için gerekli olan yeti ve teknolojileri listeden seçebilirsiniz
              ya da virgul ile ekleme yapabilirsiniz. En fazla 10 etiket ekleyebilirsiniz.
              <br>
              İlanınıza <code>frontend</code>, <code>backend</code>, <code>mobile</code>,
              <code>designer</code>, <code>qa</code> etiketlerinden birini ekleyip
              ilgili kategoride yer almasını sağlayabilirsiniz.
              <br>
              Doğru ve etkili etiketler seçmek ilanınızın ilan detay sayfasındaki
              "Benzer İlanlar" arasında gözükme şansını arttıracaktır.
            </p>
          </div>
          <div class="form">
            <h5>Başvuru bilgileri</h5>
            <input v-model="formData.apply_email" placeholder="E-posta" type="text">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.add-job {
  .button-container {
    text-align: right;
  }

  .awesomplete {
    width: 100%;
  }

  .back-button {
    background: #282828;
  }

  .save-button {
    position: absolute;
    right: 0;
  }

  code {
    font-family: monospace;
    padding: 2px 4px;
    color: #c0341d;
    background-color: #fbe5e1;
    border-radius: 4px;
  }
}
</style>
