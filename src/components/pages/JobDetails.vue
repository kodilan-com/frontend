<script>
import { mapActions } from 'vuex';
import JobTypeBadge from '../shared/JobTypeBadge';
import ApplyLink from '../shared/ApplyLink';
import Loader from '../shared/Loader';

export default {
  props: {
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    previewData: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      post: null,
      isLoading: true,
      notFound: false,
    };
  },
  components: {
    JobTypeBadge,
    ApplyLink,
    Loader,
  },
  methods: {
    ...mapActions(['fetchBySlug']),
  },
  computed: {
    postData() {
      return Object.keys(this.previewData).length ? this.previewData : this.post;
    },
    twitterUrl() {
      return `https://twitter.com/${this.postData.company.twitter}`;
    },
  },
  created() {
    if (!this.preview) {
      this.fetchBySlug(this.$route.params.slug)
        .then((res) => {
          this.isLoading = false;
          this.post = res;
        })
        .catch(() => {
          this.isLoading = false;
          this.notFound = true;
        });
    }
  },
};
</script>

<template>
  <div
    :class="{ preview: preview }"
    class="job-details"
  >
    <loader v-if="isLoading && !preview" />
    <template v-else>
      <div
        v-if="preview"
        class="notification preview warning"
      >
        <p>
          <span>Dikkat!</span>
          Bu sadece bir önizlemedir. İlanınızı yayınlamak için lütfen kaydettiğinizden emin olun.
        </p>
      </div>
      <template v-if="postData">
        <div id="titlebar">
          <div class="container">
            <div class="ten columns">
              <h2>
                {{postData.position}}
                <job-type-badge :post="postData" />
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
                  :src="postData.company.logo"
                  :alt="postData.company.name"
                />
                <div class="content">
                  <h4>{{postData.company.name}}</h4>
                  <span>
                    <a
                      :href="postData.company.www"
                      target="_blank"
                    >
                      <i class="fa fa-link"></i> Website
                    </a>
                  </span>
                  <span v-if="postData.company.twitter">
                    <a
                      :href="twitterUrl"
                      target="_blank"
                    >
                      <i class="fa fa-twitter"></i> @{{postData.company.twitter}}
                    </a>
                  </span>
                  <span v-if="postData.company.linkedin">
                    <a
                      :href="postData.company.linkedin"
                      target="_blank"
                    >
                      <i class="fa fa-linkedin"></i> {{postData.company.name}}
                    </a>
                  </span>
                </div>
                <div class="clearfix"></div>
              </div>
              <div v-html="postData.description"></div>
            </div>
          </div>
          <div class="five columns">
            <div class="widget">
              <div class="job-overview">
                <ul>
                  <li>
                    <i class="fa fa-user"></i>
                    <div>
                      <strong>Pozisyon</strong>
                      <span>{{postData.position}}</span>
                    </div>
                  </li>
                  <li>
                    <i class="fa fa-map-marker"></i>
                    <div>
                      <strong>Lokasyon</strong>
                      <span>{{postData.location}}</span>
                    </div>
                  </li>
                  <li>
                    <i class="ln ln-icon-Globe"></i>
                    <div>
                      <strong>Website</strong>
                      <span>
                        <a
                          :href="postData.company.www"
                          target="_blank"
                        >
                          {{postData.company.www}}
                        </a>
                      </span>
                    </div>
                  </li>
                  <li>
                    <i class="ln ln-icon-Tag-3"></i>
                    <div>
                      <p>
                        <strong>Etiketler</strong>
                      </p>
                      <span
                        v-for="tag in postData.tags"
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
                <apply-link :post="postData" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-else
        class="notification notice center"
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
  .listing-type {
    right: 0;

    a {
      font-size: inherit !important;
      color: inherit !important;
    }
  }

  &.preview {
    width: 1200px;
    margin: 0 auto;
    border: 4px solid #ccc;
    border-radius: 4px;
    pointer-events: none;
    box-sizing: border-box;

    #titlebar,
    .container {
      opacity: 0.66;
    }

    #titlebar {
      .container {
        width: 1060px;
      }
    }

    .notification.preview {
      margin-bottom: 0;
      font-size: 18px;
    }
  }

  .tag {
    display: inline-block;
    margin: 0 5px 5px 0;
  }
}
</style>
