<script>
import { mapState, mapActions } from 'vuex';
import Loader from './Loader';
import JobTypeBadge from './JobTypeBadge';

export default {
  data() {
    return {
      isLoading: true,
      navCounter: 0,
    };
  },
  components: {
    JobTypeBadge,
    Loader,
  },
  computed: {
    ...mapState(['featuredPosts']),
    leftPosition() {
      const index = this.navCounter % this.featuredPosts.length;
      const wrapperWidth = this.$refs.carouselWrapper.offsetWidth || 0;

      return index * wrapperWidth * -1;
    },
  },
  methods: {
    ...mapActions(['fetchFeaturedPosts']),
    getPostSummary(description) {
      const tmp = document.createElement('div');
      tmp.innerHTML = description;
      const descText = tmp.textContent || tmp.innerText || '';

      return descText.length > 200 ? `${descText.slice(0, 200)}...` : descText;
    },
    navigate(direction) {
      this.navCounter = direction === 'LEFT' ? this.navCounter - 1 : this.navCounter + 1;
      this.$refs.carousel.style.left = this.leftPosition + 'px';
    },
    navigateLeft() {
      if (this.navCounter != 0) {
        this.navigate('LEFT');
      }
    },
    navigateRight() {
      this.navigate('RIGHT');
    },
    setCarouselWidth() {
      const wrapperWidth = this.$refs.carouselWrapper.offsetWidth || 0;
      this.$refs.carousel.style.left = this.$refs.carousel.style.left || 0;
      this.$refs.carousel.style.width = `${wrapperWidth * this.featuredPosts.length}px`;
    },
  },
  created() {
    this.fetchFeaturedPosts().then(() => {
      this.isLoading = false;
      this.$nextTick(() => {
        this.setCarouselWidth();
      });
    });

    window.addEventListener('resize', this.setCarouselWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCarouselWidth);
  },
};
</script>

<template>
  <div class="five columns">
    <h3 class="margin-bottom-5">Öne çıkan ilanlar</h3>
    <loader v-if="isLoading" />
    <template v-else>
      <div
        v-if="featuredPosts.length > 1"
        class="showbiz-navigation">
        <div
          @click="navigateLeft"
          class="sb-navigation-left"
        >
          <i class="fa fa-angle-left"></i>
        </div>
        <div
          @click="navigateRight"
          class="sb-navigation-right"
        >
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="clearfix"></div>
      <div id="job-spotlight">
        <div class="showbiz">
          <div class="wrapper" ref="carouselWrapper">
            <ul ref="carousel">
              <li
                v-for="post in featuredPosts"
                :key="post.slug"
              >
                <div class="job-spotlight">
                  <router-link
                    :to="`/ilan-detay/${post.slug}`"
                    class="job-title"
                  >
                    {{post.position}}
                  </router-link>
                  <div class="details">
                    <span>
                      <i class="fa fa-briefcase"></i>
                      <router-link
                        :to="`/ilan-ara?company=${post.company.slug}`"
                      >
                        {{post.company.name}}
                      </router-link>
                    </span>
                    <span>
                      <i class="fa fa-map-marker"></i>
                      <router-link
                        :to="`/ilan-ara?location=${post.location}`"
                      >
                        {{post.location}}
                      </router-link>
                    </span>
                    <job-type-badge :post="post" />
                    <p>{{getPostSummary(post.description)}}</p>
                    <div
                      v-for="tag in post.tags"
                      :key="tag.slug"
                      class="listing-date post-tag"
                    >
                      <router-link :to="`/etiket/${tag.slug}`">
                        {{tag.name}}
                      </router-link>
                    </div>
                    <router-link
                      :to="`/ilan-detay/${post.slug}`"
                      class="button"
                    >
                      İlana git &nbsp;&nbsp;<i class="fa fa-angle-right"></i>
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<style lang="scss">
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
    }
  }

  .post-tag {
    margin: 5px 5px 5px 0;
  }
}
</style>
