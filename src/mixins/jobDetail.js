import formatDate from '../utils/date';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    detailsUrl() {
      return `/ilan-detay/${this.post.slug}`;
    },
    company() {
      return this.post.company;
    },
    timeago() {
      return formatDate(this.post.created_at);
    },
    jobType() {
      const TYPE_MAP = {
        0: 'Tam zamanlı',
        1: 'Tam zamanlı',
        2: 'Yarı zamanlı',
        3: 'Stajyer',
        4: 'Freelance',
      };

      return TYPE_MAP[this.post.type] || '';
    },
    postTypeClassName() {
      const CLASS_MAP = {
        0: 'full-time',
        1: 'full-time',
        2: 'part-time',
        3: 'internship',
        4: 'freelance',
      };

      return {
        [CLASS_MAP[this.post.type]]: true,
      };
    },
  },
};
