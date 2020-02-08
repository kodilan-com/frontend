<script>
import { mapState, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['fetchPostListing']),
    manageJobsDetails() {
      const id = this.manageJobs[0].company.id;
      this.$router.push(`manage-jobs/${id}`);
    },
  },
  computed: {
    ...mapState(['manageJobs']),
  },
  mounted() {
    this.fetchPostListing();
  },
}
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
          <th><i class="fa fa-file-text"></i>Pozisyon</th>
          <th><i class="fa fa-check-square-o"></i> Filled?</th>
          <th><i class="fa fa-calendar"></i>İlan Başlangıç</th>
          <th><i class="fa fa-calendar"></i>İlan Bitiş</th>
          <th><i class="fa fa-user"></i>Başvurular</th>
          <th></th>
        </tr>
        <tr v-for="jobs in this.manageJobs" :key="jobs.id">
          <td class="title"><a @click="manageJobsDetails">{{ jobs.position }}</a></td>
          <td class="centered">-</td>
          <td>{{ jobs.created_at }}</td>
          <td>October 10, 2015</td>
          <td class="centered"><a class="button">Göster(4)</a></td>
          <td class="action">
            <a href="#">
              <i class="fa fa-pencil"></i>
            Düzenle
            </a>
            <a href="#">
              <i class="fa  fa-check "></i>
            İşaretle
            </a>
            <a href="#" class="delete">
              <i class="fa fa-remove"></i>
              Sil
            </a>
        </td>
			</tr>
      </table>
    </div>
  </div>
</div>
</template>
