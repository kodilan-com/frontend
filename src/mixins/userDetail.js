import formatDate from '../utils/date';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timeago() {
      return formatDate(this.user.looking_for_job_at);
    },
  },
};
