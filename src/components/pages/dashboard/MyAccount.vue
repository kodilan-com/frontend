<script>
import { mapActions } from 'vuex';
import validationMixin from '../../../mixins/validator';

export default {
  mixins: [validationMixin],
  components: {},
  data() {
    return {};
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions([]),
  },
  mounted() {},
};
</script>

<template>
  <!-- Dashboard -->
  <div id="dashboard">
    <!-- Navigation
    ================================================== -->

    <!-- Responsive Navigation Trigger -->
    <a href="#" class="dashboard-responsive-nav-trigger">
      <i class="fa fa-reorder" /> Dashboard Navigation
    </a>

    <div class="dashboard-nav">
      <div class="dashboard-nav-inner">
        <!-- <ul data-submenu-title="Start">
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="dashboard-messages.html">Messages <span class="nav-tag">2</span></a></li>
        </ul> -->

        <!-- <ul data-submenu-title="Management"> -->
          <!-- <li><a>For Employers</a>
            <ul>
              <li>
                <a href="dashboard-manage-jobs.html">
                  Manage Jobs <span class="nav-tag">5</span>
                </a>
              </li>
              <li>
                <a href="dashboard-manage-applications.html">
                  Manage Applications <span class="nav-tag">4</span>
                </a>
              </li>
              <li><a href="dashboard-add-job.html">Add Job</a></li>
            </ul>
          </li> -->

          <!-- <li><a>For Candidates</a>
            <ul>
              <li><a href="dashboard-manage-resumes.html">Manage Resumes <span class="nav-tag">2</span></a></li>
              <li><a href="dashboard-job-alerts.html">Job Alerts</a></li>
              <li><a href="dashboard-add-resume.html">Add Resume</a></li>
            </ul>
          </li> -->
        <!-- </ul> -->

        <ul data-submenu-title="Hesabım">
          <li :class="[currentPage.includes('profil') ? 'active' : '']">
            <router-link to="/hesabim/profil">
              Profil
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- Navigation / End -->

    <!-- Content
    ================================================== -->
    <div class="dashboard-content">
      <router-view />
    </div>
    <!-- Content / End -->
  </div>
  <!-- Dashboard / End -->
</template>

<style lang="scss">
  @import '../../../assets/css/dashboard.css';

  #dashboard {
    padding-top: 0;
  }

  .dashboard-nav {
    box-shadow: none;
    border-top: 1px solid #eee;
    min-height: auto;
  }
</style>
