<script>
import { mapActions } from 'vuex';
import api from '../services/api';

export default {
  methods: {
    ...mapActions(['setData']),
  },
  created() {
    api.fetchData().then((data) => {
      this.setData(data);
    });
  },
};
</script>

<template>
  <h1>KodIlan.com</h1>
</template>
