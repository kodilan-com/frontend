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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
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
