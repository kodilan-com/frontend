<script>
import { mapActions } from 'vuex';
import JobTypeBadge from '../shared/JobTypeBadge';
import JobListing from '../shared/JobListing';
import ApplyLink from '../shared/ApplyLink';
import Loader from '../shared/Loader';
import image from '../../mixins/image';
import jobDetailsMetaInfoMixin from '../../mixins/jobDetailsMetaInfo';

export default {
  metaInfo: {
    title: 'Kodilan.com',
  },
  props: {
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
    previewData: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  mixins: [jobDetailsMetaInfoMixin, image],
  components: {
    Loader,
    ApplyLink,
    JobTypeBadge,
    JobListing,
  },
  data() {
    return {
      post: null,
      isLoading: true,
      notFound: false,
      relatedPosts: [],
    };
  },
  computed: {
    postData() {
      return Object.keys(this.previewData).length ? this.previewData : this.post;
    },
    twitterUrl() {
      return `https://twitter.com/${this.postData.company.twitter}`;
    },
    twitterShareUrl() {
      const { twitter } = this.postData.company;
      const twitterHandle = twitter ? `@${twitter}` : '';
      const meta = `https://kodilan.com/ilanlar/${this.postData.slug} ${twitterHandle}`;
      const encoded = encodeURI(
        `kodilan.com'da yayınlanan ${
          this.postData.position
        } başlıklı ilan ilginizi çekebilir. ${meta} @kodilancom`,
      );

      return `https://twitter.com/intent/tweet?text=${encoded.trim()}`;
    },
    updatedAt() {
      if (this.preview) {
        return '';
      }

      return new Date(this.post.updated_at).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
  },
  methods: {
    ...mapActions(['fetchBySlug', 'fetchRelatedPosts']),
    fetchData() {
      if (!this.preview) {
        this.fetchBySlug(this.$route.params.slug)
          .then((res) => {
            this.isLoading = false;
            this.post = res;

            this.fetchRelatedPosts(this.post)
              .then((posts) => {
                this.relatedPosts = posts;
              });
          })
          .catch(() => {
            this.isLoading = false;
            this.notFound = true;
          });
      }
    },
  },
  watch: {
    $route(from, to) {
      if (to.name === 'JobDetails' && from.params.slug !== to.params.slug) {
        this.fetchData();
      }
    },
  },
  created() {
    this.fetchData();
  },
  mounted() {
    if (this.$route.query.status === 'extended') {
      this.$modal.show('dialog', {
        text: 'İlanınız otuz gün uzatılmıştır. Kodilan.com kullandığınız için teşekkür ederiz.',
        title: 'Başarılı',
        buttons: [
          { title: 'Kapat' },
        ],
      });
    }
  },
};
</script>

<template>
  <div
    :class="{ preview: preview }"
    class="job-details"
    itemscope
    itemtype="http://schema.org/JobPosting"
  >
    <loader v-if="isLoading && !preview" />
    <template v-else>
      <div v-if="preview" class="notification preview warning">
        <p>
          <span>Dikkat!</span>
          Bu sadece bir önizlemedir. İlanınızı yayınlamak için lütfen kaydettiğinizden emin olun.
        </p>
      </div>
      <template v-if="postData">
        <template v-if="postData.status !== 0">
          <div id="titlebar">
            <div class="container">
              <div class="ten columns">
                <h1 itemprop="title">
                  {{ postData.position }}
                  <job-type-badge :post="postData" />
                </h1>
              </div>
              <div class="six columns">
                <a :href="twitterShareUrl" class="button dark" target="_blank">
                  <i class="fa fa-twitter" /> Paylaş
                </a>
              </div>
            </div>
          </div>
          <div class="container detail-content-container">
            <template v-if="postData.status == 2">
              <div class="notification notice">
                <p>
                  <span>Bu ilan yayından kaldırılmıştır.</span>
                  <br><br>
                  <span v-for="tag in postData.tags" :key="tag.slug" class="tag">
                    <router-link :to="`/etiket/${tag.slug}`" class="listing-date">
                      {{ tag.name }}
                    </router-link>
                  </span> etiketli diğer ilanlarımıza bakabilirsiniz.
                </p>
              </div>
            </template>
            <div :class="{ 'disabled-content': postData.status === 2 }">
              <div class="eleven columns">
                <div class="padding-right">
                  <div class="company-info"
                       itemprop="hiringOrganization"
                       itemscope itemtype="http://schema.org/Organization"
                  >
                    <router-link :to="`/firmalar/${postData.company.slug}`">
                      <img
                        itemprop="logo"
                        :src="postData.company.logo"
                        :alt="postData.company.name"
                        ref="logo"
                        @error="handleImageError"
                      >
                    </router-link>
                    <div class="content">
                      <h4 itemprop="name">
                        {{ postData.company.name }}
                      </h4>
                      <span>
                        <span itemprop="sameAs" :content="postData.company.www" />
                        <a :href="postData.company.www" target="_blank">
                          <i class="fa fa-link" /> Website
                        </a>
                      </span>
                      <span v-if="postData.company.twitter">
                        <a :href="twitterUrl" target="_blank">
                          <i class="fa fa-twitter" />
                          @{{ postData.company.twitter.replace('@', '') }}
                        </a>
                      </span>
                      <span v-if="postData.company.linkedin">
                        <a :href="postData.company.linkedin" target="_blank">
                          <i class="fa fa-linkedin" /> {{ postData.company.name }}
                        </a>
                      </span>
                    </div>
                    <div class="clearfix" />
                  </div>
                  <div class="job-description"
                       itemprop="description"
                       v-html="postData.description"
                  />
                </div>
              </div>
              <div class="five columns">
                <div class="widget">
                  <div class="job-overview">
                    <ul>
                      <li v-if="updatedAt">
                        <i class="fa fa-calendar-check-o" />
                        <div>
                          <strong>Son Güncelleme</strong>
                          <span>{{ updatedAt }}</span>
                        </div>
                      </li>
                      <li>
                        <i class="fa fa-user" />
                        <div>
                          <strong>Pozisyon</strong>
                          <span>{{ postData.position }}</span>
                        </div>
                      </li>
                      <li>
                        <i class="fa fa-map-marker" />
                        <div>
                          <strong>Lokasyon</strong>
                          <span itemprop="jobLocation"
                                itemscope
                                itemtype="http://schema.org/Place"
                          >
                            <span itemprop="address"
                                  itemscope
                                  itemtype="http://schema.org/PostalAddress"
                            >
                              <span itemprop="addressLocality">
                                {{ postData.location }}
                              </span>
                            </span>
                          </span>
                        </div>
                      </li>
                      <span itemprop="datePosted" :content="postData.updated_at" />
                      <li>
                        <i class="ln ln-icon-Globe" />
                        <div>
                          <strong>Website</strong>
                          <span class="companyLink">
                            <a :href="postData.company.www" target="_blank">
                              {{ postData.company.www }}
                            </a>
                          </span>
                        </div>
                      </li>
                      <li>
                        <i class="ln ln-icon-Tag-3" />
                        <div>
                          <p>
                            <strong>Etiketler</strong>
                          </p>
                          <span
                            v-for="tag in postData.tags"
                            :key="tag.slug"
                            class="tag"
                          >
                            <router-link :to="`/etiket/${tag.slug}`" class="listing-date">
                              {{ tag.name }}
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
            <div class="sixteen columns" v-if="relatedPosts.length">
              <h3 class="margin-bottom-25">
                Benzer ilanlar
              </h3>
              <job-listing :posts="relatedPosts" />
            </div>
          </div>
        </template>
      </template>
      <div v-else class="notification notice center">
        <p>
          <span>Böyle bir ilan bulunamadı.</span>
        </p>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.job-details {
  #titlebar .listing-type {
    right: 0;

    a {
      font-size: inherit !important;
      color: inherit !important;
    }
  }

  .disabled-content {
    pointer-events: none;
    opacity: .5;
  }

  &.preview {
    width: 100%;
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

  .job-description li {
    line-height: 22px;
    list-style-type: disc;
    list-style-position: inside;
  }
}
</style>
