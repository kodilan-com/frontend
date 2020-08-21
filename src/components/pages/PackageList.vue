<script>
import { mapActions, mapGetters } from 'vuex';

import Loader from '../shared/Loader';

export default {
  metaInfo: {
    title: 'Ödemeler | Kodilan.com',
  },
  components: {
    Loader,
  },
  data() {
    return {
      packageList: null,
      saving: false,
    };
  },
  methods: {
    ...mapActions([
      'getPackageList',
    ]),
    loadPackageList() {
      this.saving = true;

      this.getPackageList()
        .then((response) => {
          this.packageList = response.data.list;
        })
        .finally(() => {
          this.saving = false;
        });
    },
  },
  mounted() {
    this.loadPackageList();
  },
};
</script>
<template>
  <div>
    <div id="titlebar" class="single">
      <div class="container">
        <div class="sixteen columns">
          <h2>Fiyatlandırma</h2>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- <div class="sixteen columns">
        <div class="notification notice margin-bottom-30">
          <p>I want.</p>
        </div>
      </div> -->

      <div class="container">
        <div
          class="plan one-third column"
          v-for="(item, index) in packageList"
          :key="item.id"
          :class="[index === 1 ? 'color-2' : 'color-1']"
        >
          <div class="plan-price">
            <h3>{{ item.title }}</h3>
            <span v-if="item.price === 0">
              <span class="value">Ücretsiz</span>
            </span>
            <span v-else-if="item.price === null">
              <span class="value">İletişime Geçin</span>
            </span>
            <span v-else>
              <span class="value">
                {{ item.price }}
              </span>
              <span class="plan-currency">₺</span>
            </span>
          </div>
          <div class="plan-features">
            <ul>
              <li v-for="(feature, index) in item.features" :key="index">
                {{ feature }}
              </li>
            </ul>
            <a class="button" href="#">
              <i class="fa fa-shopping-cart" />
              Satın Al
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
