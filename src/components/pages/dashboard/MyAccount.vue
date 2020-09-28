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
      if (!this.user || !this.user.companies.length) return false;

      let canSearchDevelopers = false;

      this.user.companies.forEach((company) => {
        if (company.can_search_developers) {
          canSearchDevelopers = true;
        }
      });

      return canSearchDevelopers;
    },
  },
  methods: {
    ...mapActions([]),
    handleTopMenuClick(event) {
      event.preventDefault();
      const element = event.target;

      if (element.closest('li').querySelector('ul')) {
        if (element.closest('li').classList.contains('active-submenu')) {
          document.querySelectorAll('.dashboard-nav ul li.active-submenu').forEach((active) => {
            active.classList.remove('active-submenu');
          });
        } else {
          document.querySelectorAll('.dashboard-nav ul li.active-submenu').forEach((active) => {
            active.classList.remove('active-submenu');
          });
          element.parentElement.classList.add('active-submenu');
        }
      }
    },
  },
  mounted() {
    if (!this.user) {
      setTimeout(() => {
        if (!this.user) {
          this.$router.push({
            path: '/giris',
          });
        }
      }, 5000);
    }
  },
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

        <ul data-submenu-title="Yönetim" v-if="user && user.companies && user.companies.length > 0">
          <li>
            <a @click="handleTopMenuClick">
              İlan Yönetimi
            </a>
            <ul>
              <li :class="[currentPage.endsWith('ilanlarim') ? 'active' : '']">
                <router-link to="/hesabim/ilanlarim">
                  İlanlarım
                  <!-- <span class="nav-tag">5</span> -->
                </router-link>
              </li>
              <!-- <li>
                <a href="dashboard-manage-applications.html">
                  Manage Applications <span class="nav-tag">4</span>
                </a>
              </li> -->
              <li :class="[currentPage.endsWith('ilanlarim/ekle') ? 'active' : '']">
                <router-link to="/hesabim/ilanlarim/ekle">
                  İlan Ekle
                </router-link>
              </li>
            </ul>
          </li>
          <li :class="[currentPage.includes('odemeler') ? 'active' : '']">
            <router-link to="/hesabim/odemeler">
              Ödemeler
            </router-link>
          </li>

          <!-- <li><a>For Candidates</a>
            <ul>
              <li><a href="dashboard-manage-resumes.html">Manage Resumes <span class="nav-tag">2</span></a></li>
              <li><a href="dashboard-job-alerts.html">Job Alerts</a></li>
              <li><a href="dashboard-add-resume.html">Add Resume</a></li>
            </ul>
          </li> -->
        </ul>

        <ul data-submenu-title="Hesabım">
          <li :class="[currentPage.includes('profil') ? 'active' : '']">
            <router-link to="/hesabim/profil">
              Profilim
            </router-link>
          </li>
          <li :class="[currentPage.includes('firmalarim') ? 'active' : '']">
            <router-link to="/hesabim/firmalarim">
              Firmalarım
            </router-link>
          </li>
        </ul>

        <ul
          data-submenu-title="Developer Bul"
          v-if="user && user.companies && user.companies.length > 0 && canSearchDevelopers"
        >
          <li :class="[currentPage.includes('developer-ara') ? 'active' : '']">
            <router-link to="/developer-ara">
              İş Arayan Developerlar
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

  .text-success {
    color: #26ae61 !important;
  }

  .text-danger {
    color: rgb(222, 11, 19) !important;
  }
</style>
