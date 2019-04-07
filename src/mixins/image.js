const emptyLogo = require('../assets/images/empty-company-logo.png');

export default {
  methods: {
    handleImageError() {
      this.$refs.logo.src = emptyLogo;
    },
  },
};
