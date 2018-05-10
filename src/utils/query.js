export default {
  getParams(data) {
    const { query, location, type } = data;
    const params = {};

    if (!query && !location && !type) {
      return false;
    }

    if (query) {
      params.query = query;
    }

    if (location) {
      params.location = location;
    }

    if (type) {
      params.type = type;
    }

    return params;
  },
};
