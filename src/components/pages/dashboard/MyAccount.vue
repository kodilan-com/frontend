<script>
import { mapActions, mapGetters } from 'vuex';
import validationMixin from '../../../mixins/validator';

export default {
  metaInfo: {
    title: 'Hesabım | Kodilan.com',
  },
  mixins: [validationMixin],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user']),
    currentPage() {
      return this.$route.path;
    },
    canSearchDevelopers() {
      return false;
      // if (!this.user || !this.user.companies.length) return false;
      //
      // let canSearchDevelopers = false;
      //
      // this.user.companies.forEach((company) => {
      //   if (company.can_search_developers) {
      //     canSearchDevelopers = true;
      //   }
      // });
      //
      // return canSearchDevelopers;
    },
  },
  methods: {
    ...mapActions(['setUser', 'setAccessToken']),
    handleLogoutClick() {
      this.setAccessToken(null);
      this.setUser(null);
      this.$router.push('/giris');
    },
  },
};
</script>

<template>
  <!-- Dashboard -->
  <div class="container" id="dashboard">
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

        <ul data-submenu-title="Yönetim" v-if="user && user.companies && user.companies.length > 0">
          <li :class="[currentPage.endsWith('ilanlarim') ? 'active' : '']">
            <router-link to="/hesabim/ilanlarim">
              İlanlarım
              <!-- <span class="nav-tag">5</span> -->
            </router-link>
          </li>
          <li :class="[currentPage.endsWith('ilanlarim/ekle') ? 'active' : '']">
            <router-link to="/hesabim/ilanlarim/ekle">
              İlan Ekle
            </router-link>
          </li>
          <li :class="[currentPage.includes('odemeler') ? 'active' : '']">
            <router-link to="/hesabim/odemeler">
              Ödemeler
            </router-link>
          </li>

          <!-- <li><a>For Candidates</a>
            <ul>
              <li><a href="dashboard-manage-resumes.html">
                Manage Resumes <span class="nav-tag">2</span>
              </a></li>
              <li><a href="dashboard-job-alerts.html">Job Alerts</a></li>
              <li><a href="dashboard-add-resume.html">Add Resume</a></li>
            </ul>
          </li> -->
        </ul>

        <ul
          data-submenu-title="Yetenek Havuzu"
          v-if="user && user.companies && user.companies.length > 0 && canSearchDevelopers"
        >
          <li :class="[currentPage.includes('developer-ara') ? 'active' : '']">
            <router-link to="/developer-ara">
              İş Arayan Developerlar
            </router-link>
          </li>
        </ul>

        <ul data-submenu-title="Hesabım">
          <li :class="[currentPage.includes('firmalarim') ? 'active' : '']">
            <router-link to="/hesabim/firmalarim">
              Firmalarım
            </router-link>
          </li>
          <li :class="[currentPage.includes('profil') ? 'active' : '']">
            <router-link to="/hesabim/profil">
              Profilim
            </router-link>
          </li>
          <li>
            <a href="#" @click.prevent="handleLogoutClick">
              Çıkış
            </a>
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
    background: #fff;
    padding-top: 0;
  }

  .dashboard-nav {
    box-shadow: none;
    border-top: 1px solid #eee;
    min-height: auto;
    position: static;
  }

  .dashboard-content {
    margin-left: 0;
  }

  .dashboard-list-box {
    margin: 0 0 30px 0;
  }

  .text-success {
    color: #26ae61 !important;
  }

  .text-danger {
    color: rgb(222, 11, 19) !important;
  }
</style>
