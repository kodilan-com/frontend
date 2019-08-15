<img src="./public/logo_c.png" />

----

[![pipeline status](https://gitlab.com/kodilan/frontend/badges/master/pipeline.svg)](https://gitlab.com/kodilan/frontend/commits/master)
[![Travis Status](https://travis-ci.com/kodilan-com/frontend.svg?branch=master)](https://travis-ci.com/kodilan-com/frontend)
[![codecov](https://codecov.io/gh/kodilan-com/frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/kodilan-com/frontend)

This project is the official Frontend codebase of [kodilan.com](https://kodilan.com) which is a software related job board for Turkey.

### Tech Stack

This project based on [Vue](https://github.com/vuejs/vue) stack and uses [Vuex](https://github.com/vuejs/vuex), [Vue Router](https://github.com/vuejs/vue-router) and [Vue CLI](https://github.com/vuejs/vue-cli).

#### Ajax Requests
To handle AJAX requests, we use [axios](https://github.com/axios/axios). The data we fetch from the server will unlikely change during a user session, so we cache responses using an Axios Middleware called [axios-extensions](https://github.com/kuitos/axios-extensions). This makes our app blazingly fast in between page changes. For the best user experience, we also [maintain the scroll position](https://gitlab.com/kodilan/frontend/blob/master/src/router/index.js#L93-95) between pages changes, thanks to [Vue Router's Scroll Behavior](https://router.vuejs.org/guide/advanced/scroll-behavior.html) feature.

#### SEO
Since [kodilan.com](https://kodilan.com) is a Single Page Application job posting board, SEO plays a very critical role in our organic growth. To generate dynamic page title, keywords, meta tags and Open Graph tags, we use [vue-meta](https://github.com/nuxt/vue-meta) from Nuxt team. On top of that, we use [Prerender.io](https://prerender.io) to serve SEO friendly HTML to search engines.

### Running project locally

We use [yarn](https://yarnpkg.com/en/) as our package manager and you should have yarn installed on your machine to be able to run this project locally. After that you can run the following commands in order.

- yarn install
- yarn serve

### CHANGELOG

Please take a look at the [CHANGELOG](https://gitlab.com/kodilan/frontend/blob/master/CHANGELOG.md) file.

### Contributors

- [Fatih Acet](https://twitter.com/fatihacet)
- [Emir Karşıyakalı](https://twitter.com/emirkarsiyakali)
- [Didem Acet](https://twitter.com/didemacet)
- [Erdoğan Bulut](https://github.com/erdoganbulut)
- [Mehmet Ersan Uzun](https://github.com/mersanuzun)
- [Tugay Yaldız](https://github.com/TugayYaldiz)
- [Olga Bulat](https://github.com/obulat)
- [Barış Kartal](https://github.com/bskl)
- [Ali Ertan Biberoğlu](https://github.com/AliBiberoglu)
- [Ali Gören](https://github.com/aligoren)
- [Furkan Köse](https://github.com/furkankose)
- [İlker Demir](https://github.com/ilker0)
- [Berkan Sivri](https://github.com/berkansivri)

### More content

You can take a look the following video to deep dive into the codebase.

[![cover](https://i3.ytimg.com/vi/3Zbd7ELMOtw/maxresdefault.jpg)](https://www.youtube.com/watch?v=3Zbd7ELMOtw)
