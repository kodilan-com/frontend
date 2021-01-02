<script>
import MentorCard from '../shared/MentorCard';

const mentors = require('../../assets/data/mentors.json');

export default {
  components: {
    MentorCard,
  },
  mentors: mentors.sort(() => Math.random() - 0.5),
};
</script>

<template>
  <div>
    <div id="titlebar" class="single submit-page">
      <div class="container">
        <div class="sixteen columns">
          <h1>Kodilan Mentorları</h1>
          <span class="headline">
            Alanında uzman kişilerden yazılım geliştirme, kariyer tavsiyeleri, tasarım, SEO, DevOps gibi konularda danışmanlık almak için 1'e 1 randevu alabilirsiniz.
            <br>
            <br>
            Bu listede yer almak istiyorsanız, <a href="https://forms.gle/DYCQH1Wfj25TdHxH6" target="_blank" rel="noreferrer noopener">buradan</a> başvuruda bulunabilirsiniz.
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="sixteen columns">
        <ul class="resumes-list alternative">
          <li v-for="mentor in $options.mentors" :key="mentor.username">
            <mentor-card
              :username="mentor.username"
              :profile="mentor.profile"
            />
          </li>
        </ul>
        <div class="clearfix" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#titlebar a {
  color: #26ae61;
}

@media only screen and (max-width: 767px) {
  .headline, .headline a {
    font-size: 14px !important;
  }
}
</style>
