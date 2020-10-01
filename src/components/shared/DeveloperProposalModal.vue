<script>
import { mapActions, mapGetters } from 'vuex';
import Loader from './Loader';

export default {
  props: {
    developer: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  components: {
    Loader,
  },
  data() {
    return {
      isLoading: false,
      showSuccess: false,
      formData: {
        body: null,
        company: null,
        proposed_wage: null,
      },
    };
  },
  computed: {
    ...mapGetters(['companies']),
    companyOptions() {
      const options = [];

      if (this.companies && this.companies.length) {
        this.companies.forEach((company) => {
          if (company.can_search_developers) {
            options.push(company);
          }
        });
      }

      return options;
    },
  },
  methods: {
    ...mapActions(['saveDeveloperProposal']),
    handleProposalSubmit(event) {
      event.preventDefault();

      this.isLoading = true;

      const postData = {
        ...this.formData,
        company_id: this.formData.company.id,
        developer_id: this.developer.id,
      };

      this.saveDeveloperProposal(postData)
        .then(() => {
          this.showSuccess = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleModalDismiss() {
      this.$modal.hide('developer-proposal-modal');
    },
  },
  mounted() {
    if (this.companyOptions.length) {
      [this.formData.company] = this.companyOptions;
    }
  },
};
</script>
<template>
  <div class="modal-container">
    <Loader v-if="isLoading" />
    <div class="developer-info" v-if="!isLoading && !showSuccess">
      <h3>{{ developer.title }}</h3>
      <p>{{ developer.bio }}</p>
      <p>
        <span class="location">
          <i class="fa fa-map-marker" /> {{ developer.location.name }}
        </span>
        <span v-if="developer.expected_wage">
          <i class="fa fa-money" /> {{ developer.expected_wage.toLocaleString() }} ₺ / ay
        </span>
      </p>
    </div>
    <form @submit="handleProposalSubmit" v-if="!isLoading && !showSuccess">
      <div class="form-group">
        <label for="body">Firma</label>
        <multiselect
          v-model="formData.company"
          :options="companyOptions"
          label="name"
          :searchable="false"
          :close-on-select="true"
          placeholder="Seçiniz..."
          v-if="companyOptions"
        />
      </div>

      <div class="form-group">
        <label for="body">Önyazı</label>
        <textarea
          name="body"
          id="body"
          v-model="formData.body"
          minlength="100"
          maxlength="10000"
          required
        />
      </div>

      <div class="form-group">
        <label for="proposed_wage">Aylık Net Maaş Teklifiniz</label>
        <input
          type="number"
          name="proposed_wage"
          id="proposed_wage"
          v-model="formData.proposed_wage"
          min="2000"
          max="999999"
          step="1"
          required
        >
      </div>

      <div class="button-container">
        <button type="button" class="button gray" @click="handleModalDismiss">
          Listeye Dön
        </button>
        <button type="submit" class="button">
          Teklif Gönder
        </button>
      </div>
    </form>

    <div class="success" v-if="showSuccess">
      <p>
        Teklifiniz başarıyla gönderilmiştir.
      </p>
      <button type="button" class="button" @click="handleModalDismiss">
        Listeye Dön
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .modal-container {
    padding: 20px;

    h3 {
      color: var(--primary-color);
    }

    p > span {
      display: inline-block;
      margin-right: 17px;

      > i {
        color: #999;
        margin-right: 4px;
      }
    }

    .form-group {
      margin-bottom: 15px;
    }

    .button-container {
      text-align: right;

      [type="submit"] {
        margin-left: 10px;
      }
    }

    .success {
      font-size: 2em;
      padding: 50px;
      text-align: center;
    }
  }
</style>
