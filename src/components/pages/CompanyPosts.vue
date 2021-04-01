<script>
import { mapActions } from 'vuex';
import image from '../../mixins/image';
import AppBanner from '../shared/AppBanner_v2';
import JobListing from '../shared/JobListing';
import companyPostsMetaInfoMixin from '../../mixins/companyPostsMetaInfo';

export default {
  name: 'CompanyPosts',
  mixins: [companyPostsMetaInfoMixin, image],
  components: {
    JobListing,
    AppBanner
  },
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(['fetchByCompany']),
  },
  created() {
    this.isLoading = true;
    const company = this.$route.params.slug;

    this.fetchByCompany(company).then(({ data }) => {
      this.posts = data;
      this.isLoading = false;
    });
  },
};
</script>

<template>
  <div>
    <div id="titlebar" v-if="!isLoading && posts.length">
      <div class="container" v-if="posts.length">
        <div class="sixteen columns">
          <div class="company-jobs">
            <img
              :src="posts[0].company.logo"
              :alt="posts[0].company.name"
              ref="logo"
              loading="lazy"
              @error="handleImageError"
              class="tag-post-link"
            >
            <div class="company-info-text">
              <h1>{{ posts[0].company.name }}</h1>
              <h6>Bu firmaya ait {{ posts.length }} ilan bulunuyor</h6>
              <div class="company-social">
                <a target="_blank" :href="'https://twitter.com/' + posts[0].company.twitter" class="twitter-link" v-if="posts[0].company.twitter">
                  <svg viewBox="0 0 24 24" class="r-13gxpu9 r-4qtqp9 r-yyyyoo r-16y2uox r-1q142lx r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
                  {{posts[0].company.twitter}}
                </a>
                <a target="_blank" :href="posts[0].company.linkedin" class="linkedin-link" v-if="posts[0].company.linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  {{posts[0].company.name}}
                </a>
                <a target="_blank" :href="posts[0].company.www" v-if="posts[0].company.www">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {{posts[0].company.www}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="eleven columns">
        <div class="padding-right">
          <job-listing
            :is-loading="isLoading"
            :posts="posts"
            not-found-text="Bu firmaya ait güncel ilan bulunamadı."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .searchform-wrapper {
    margin-top: 24px;
    border-radius: 4px;
    padding: 24px 32px;
    background-color: #FFF;
    box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
  }

  .company-jobs {
    display: flex;
    flex-direction: row;
    
    img {
      width: 128px;
      height: 128px;
      padding: 16px;
      margin-right: 32px;
      background-color: #FFF;
      border-radius: 8px;
      box-shadow: 0px 2px 4px -3px rgba(0,0,0,.1), 0px 10px 15px -3px rgba(0,0,0,.05);
    }

    .company-info-text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h1 {
        color: #FFF;
        font-size: 36px;
        margin-bottom: 24px;
      }

      h6 {
        color: #26AE61;
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
          margin-right: 56px;
          font-size: 20px;
          color: #FFF;

          svg {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            margin-top: -2px;
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
</style>
