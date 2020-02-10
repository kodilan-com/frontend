<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['manageJobs']),
  },
  methods: {
    ...mapActions(['fetchPostListing']),
    editPost() {
      const name = this.manageJobs[0].slug;
      this.$router.push(`/manage-jobs/edit/${name}`);
    },
  },
  mounted() {
    this.$store.dispatch('fetchPostListing');
  },
};
</script>

<template>
  <div>
    <div id="titlebar" class="single">
      <div class="container">
        <div class="sixteen columns">
          <h2>Manage Jobs</h2>
          <nav id="breadcrumbs">
            <ul>
              <li>You are here:</li>
              <li><a href="#">Home</a></li>
              <li>Job Dashboard</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sixteen columns">
        <p class="margin-bottom-25">Your listings are shown in the table below. Expired listings will be automatically removed after 30 days.</p>
        <table class="manage-table responsive-table">
          <tr>
            <th><i class="fa fa-file-text" />Pozisyon</th>
            <th><i class="fa fa-check-square-o" />Filled?</th>
            <th><i class="fa fa-calendar" />İlan Başlangıç</th>
            <th><i class="fa fa-calendar" />İlan Bitiş</th>
            <th><i class="fa fa-user" />Başvurular</th>
            <th></th>
          </tr>
          <tr v-for="jobs in this.manageJobs" :key="jobs.id">
            <td class="title">
              <a>{{ jobs.position }}</a>
            </td>
            <td class="centered">-</td>
            <td>{{ jobs.created_at }}</td>
            <td>October 10, 2015</td>
            <td class="centered">
              <a class="button">Göster(4)</a>
            </td>
            <td class="action">
              <a @click="editPost">
                <i class="fa fa-pencil" />
                Düzenle
              </a>
              <a href="#">
                <i class="fa  fa-check" />
                İşaretle
              </a>
              <a href="#" class="delete">
                <i class="fa fa-remove" />
                Sil
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage-table {
  .title {
    a {
      cursor: pointer;
    }
  }
}
</style>
