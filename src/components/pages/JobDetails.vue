<script>
import { mapActions } from 'vuex';
import Loader from '../shared/Loader';

export default {
  data() {
    return {
      post: null,
      isLoading: true,
      notFound: false,
    };
  },
  components: {
    Loader,
  },
  methods: {
    ...mapActions(['fetchBySlug']),
  },
  computed: {
    twitterUrl() {
      return `https://twitter.com/${this.post.company.twitter}`;
    },
  },
  created() {
    this.fetchBySlug(this.$route.params.slug)
      .then((res) => {
        this.isLoading = false;
        this.post = res;
      })
      .catch(() => {
        this.isLoading = false;
        this.notFound = true;
      });
  },
};
</script>

<template>
  <div class="job-details">
    <loader v-if="isLoading" />
    <template v-if="!isLoading">
      <template v-if="post">
        <div id="titlebar">
          <div class="container">
            <div class="ten columns">
              <h2>
                {{post.position}}
                <span class="full-time">Full-Time</span>
              </h2>
            </div>
            <div class="six columns">
              <a href="#" class="button dark">
                <i class="fa fa-twitter"></i> Paylaş
              </a>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="eleven columns">
            <div class="padding-right">
              <div class="company-info">
                <img
                  :src="post.company.logo"
                  :alt="post.company.name"
                />
                <div class="content">
                  <h4>{{post.company.name}}</h4>
                  <span>
                    <a
                      :href="post.company.www"
                      target="_blank"
                    >
                      <i class="fa fa-link"></i> Website
                    </a>
                  </span>
                  <span v-if="post.company.twitter">
                    <a
                      :href="twitterUrl"
                      target="_blank"
                    >
                      <i class="fa fa-twitter"></i> @{{post.company.twitter}}
                    </a>
                  </span>
                  <span v-if="post.company.linkedin">
                    <a
                      :href="post.company.linkedin"
                      target="_blank"
                    >
                      <i class="fa fa-linkedin"></i> {{post.company.name}}
                    </a>
                  </span>
                </div>
                <div class="clearfix"></div>
              </div>
              {{post.description}}
            </div>
          </div>
          <div class="five columns">
            <div class="widget">
              <div class="job-overview">
                <ul>
                  <li>
                    <i class="fa fa-map-marker"></i>
                    <div>
                      <strong>Lokasyon</strong>
                      <span>{{post.location}}</span>
                    </div>
                  </li>
                  <li>
                    <i class="fa fa-user"></i>
                    <div>
                      <strong>Pozisyon</strong>
                      <span>{{post.position}}</span>
                    </div>
                  </li>
                  <li>
                    <i class="fa fa-tag"></i>
                    <div>
                      <p>
                        <strong>Etiketler</strong>
                      </p>
                      <span
                        v-for="tag in post.tags"
                        :key="tag.slug"
                        class="tag"
                      >
                        <router-link
                          :to="`/etiket/${tag.slug}`"
                          class="listing-date"
                        >
                          {{tag.name}}
                        </router-link>
                      </span>
                    </div>
                  </li>
                </ul>
                <a href="#small-dialog" class="popup-with-zoom-anim button">Bu pozisyona başvur</a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="notification notice closeable"
      >
        <p>
          <span>Böyle bir ilan bulunamadı.</span>
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.job-details {
  .tag {
    display: inline;
    margin-right: 5px;
  }
}
</style>
