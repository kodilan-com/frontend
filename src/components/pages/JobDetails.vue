<script>
import { mapActions } from 'vuex';
import JobTypeBadge from '../shared/JobTypeBadge';
import JobListing from '../shared/JobListing';
import ApplyLink from '../shared/ApplyLink';
import Loader from '../shared/Loader';
import image from '../../mixins/image';
import jobDetailMixin from '../../mixins/jobDetail';
import jobDetailsMetaInfoMixin from '../../mixins/jobDetailsMetaInfo';

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
      default: () => ({}),
    },
  },
  mixins: [jobDetailsMetaInfoMixin, image, jobDetailMixin],
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
                  "<strong>{{ postData.position }}</strong>" ilan detayları
                  <!-- <job-type-badge :post="postData" /> -->
                </h1>
              </div>
              <div class="six columns">
                <a :href="twitterShareUrl" class="button" target="_blank">
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
                  <div class="job-full-details">
                    <!--
                    <div class="company-info"
                        itemprop="hiringOrganization"
                        itemscope itemtype="http://schema.org/Organization">
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
                    -->
                    <div class="company-jobs">
                      <img
                        :src="postData.company.logo"
                        :alt="postData.company.name"
                        ref="logo"
                        loading="lazy"
                        @error="handleImageError"
                        class="tag-post-link"
                      >
                      <div class="company-info-text">
                        <h1>{{ postData.company.name }}</h1>
                        <div class="company-social">
                          <a target="_blank" :href="'https://twitter.com/' + postData.company.twitter" class="twitter-link" v-if="postData.company.twitter">
                            <svg viewBox="0 0 24 24" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-16y2uox r-1q142lx r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                            <!-- {{postData.company.twitter}}-->
                          </a>
                          <a target="_blank" :href="postData.company.linkedin" class="linkedin-link" v-if="postData.company.linkedin">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <!--{{postData.company.name}}-->
                          </a>
                          <a target="_blank" :href="postData.company.www" v-if="postData.company.www">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {{postData.company.www}}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="job-description"
                        itemprop="description"
                        v-html="postData.description"
                    />
                  </div>
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
                        <i class="fa fa-clock-o" />
                        <div>
                          <strong>Çalışma Tipi</strong>
                          <span>{{ jobType || 'Belirtilmemiş' }}</span>
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
            <div class="sixteen columns related-jobs" v-if="relatedPosts.length">
              <h3>
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

  .company-jobs {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 32px;
    
    img {
      width: 96px;
      height: 96px;
      padding: 12px;
      margin-right: 32px;
      background-color: #FFF;
      border-radius: 4px;
      border: 1px solid #f1f2f4;
      box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
    }

    .company-info-text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      h1 {
        color: #000;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 16px;
      }

      h6 {
        color: #333333;
        font-size: 24px;
        margin-bottom: 24px;
      }

      div.company-social {
        display: flex;
        flex-direction: row;
        
        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 24px;
          font-size: 12px;
          font-weight: 500;
          color: #000;

          svg {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            margin-top: 0px;
          }

          &.twitter-link {
            svg { fill: #1DA1F2; }
          }

          &.linkedin-link {
            svg { fill: #0077B7; }
          }
        }
      }
    }
  }

.job-full-details {
  padding: 24px 32px 24px 32px;
  margin-bottom: 48px;

  border-radius: 4px;
  background-color: #FFF;
  box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
}

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

  .job-description li {
    line-height: 22px;
    list-style-type: disc;
    list-style-position: inside;
  }
}
</style>
