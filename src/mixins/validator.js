import Schema from 'async-validator';

export default {
  data() {
    return {
      isDirty: false,
      validationErrorMessages: {},
    };
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        if (this.isDirty) {
          this.validateForm();
        }
      },
    },
  },
  created() {
    if (!this.rules && !this.formData) {
      return;
    }

    this.schema = new Schema(this.rules);
  },
  methods: {
    validateForm() {
      this.validationErrorMessages = {};
      this.isDirty = false;
      let isValid = true;

      this.schema.validate(this.formData, (errors) => {
        if (errors) {
          isValid = false;

          this.isDirty = true;
          errors.forEach(({ field, message }) => {
            this.validationErrorMessages[field] = message.replace(field, 'Field ');
          });
        }
      });

      return isValid;
    },
  },
};
