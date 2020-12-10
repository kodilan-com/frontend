const emptyLogo = require('../assets/images/empty-company-logo.png');

export default {
  methods: {
    handleImageError() {
      if (this.$refs.logo) {
        this.$refs.logo.src = emptyLogo;
      }
    },
  },
};
