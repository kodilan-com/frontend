<script>
import { mapState, mapActions } from 'vuex';
import Loader from './Loader';
import JobTypeBadge from './JobTypeBadge';

export default {
  props: {
    contentLength: {
      type: Number,
      required: false,
      default: 200,
    },
  },
  components: {
    JobTypeBadge,
    Loader,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState(['featuredPosts']),
  },
  methods: {
    ...mapActions(['fetchFeaturedPosts']),
    getPostSummary(description) {
      const tmp = document.createElement('div');
      tmp.innerHTML = description;
      const descText = tmp.textContent || tmp.innerText || '';
      const cl = this.contentLength;

      return descText.length > cl ? `${descText.slice(0, cl)}...` : descText;
    },
  },
  created() {
    this.fetchFeaturedPosts()
      .then(() => {
        this.isLoading = false;
      });
  },
};
</script>

<template>
  <div class="columns">
    <h3>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
      Öne çıkan ilanlar
    </h3>
    <loader v-if="isLoading" />
    <template v-else>
      <div id="job-spotlight">
        <div class="showbiz">
          <div class="wrapper">
            <ul>
              <li v-for="post in featuredPosts" :key="post.slug">
                <div class="job-spotlight">
                  <router-link :to="`/ilanlar/${post.slug}`" class="job-title">
                    {{ post.position }}
                  </router-link>
                  <div class="details">
                    <span>
                      <i class="fa fa-briefcase" />
                      <router-link :to="`/firmalar/${post.company.slug}`">
                        {{ post.company.name }}
                      </router-link>
                    </span>
                    <span>
                      <i class="fa fa-map-marker" />
                      <router-link :to="`/ilan-ara?location=${post.location}`">
                        {{ post.location }}
                      </router-link>
                    </span>
                    <job-type-badge :post="post" />
                    <p>{{ getPostSummary(post.description) }}</p>
                    <div v-for="tag in post.tags" :key="tag.slug" class="listing-date post-tag">
                      <router-link :to="`/etiket/${tag.slug}`">
                        {{ tag.name }}
                      </router-link>
                    </div>
                    <router-link :to="`/ilanlar/${post.slug}`" class="button tag-go-featured-post">
                      İlana git &nbsp;&nbsp;<i class="fa fa-angle-right" />
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
            <div class="clearfix" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">

  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 500;
    margin-bottom: 8px;

    svg {
      width: 24px;
      height: 24px;
      background-color: #26ae61;
      stroke: #FFF;
      margin-right: 12px;
      padding: 8px;
      border-radius: 50%;
    }
  }


#job-spotlight {
  .wrapper {
    overflow: hidden;

    ul {
      overflow: hidden;
      position: relative;
      transition: left 0.3s ease-in;
    }

    li {
      float: left;
      width: 100%;
    }
  }

  .post-tag {
    margin: 5px 5px 5px 0;
  }
}
</style>
