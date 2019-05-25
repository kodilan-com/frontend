<script>
import feedbacks from '../../assets/data/testimonials';

export default {
  data() {
    return { feedbacks };
  },
};
</script>

<template>
  <section class="fullwidth-testimonial margin-top-15">
    <div class="container">
      <div class="sixteen columns">
        <h3 class="headline centered">
          kodilan.com kullanıcılarının yorumları
        </h3>
      </div>
    </div>
    <div class="feedbacks">
      <div v-for="feedback in feedbacks" :key="feedback.fullName" class="feedback">
        <div class="testimonial-box">
          <div class="testimonial">
            {{ feedback.feedback }}
          </div>
        </div>
        <div class="testimonial-author">
          <img :src="feedback.avatar" :alt="feedback.fullName">
          <div class="testimonial-author-name">
            <p class="name">
              {{ feedback.fullName }}
            </p>
            <p>
              {{ feedback.company }}, {{ feedback.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
