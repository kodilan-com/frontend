export default {
  metaInfo() {
    if (this.isLoading) {
      return {};
    }

    const { headline } = this.$refs;

    if (!headline) {
      return {};
    }

    const keywords = Array.from(headline.querySelectorAll('strong'))
      .reduce((acc, tag) => {
        const keyword = tag.innerText;

        acc.push(`${keyword} iş ilanları`);
        acc.push(`istanbul ${keyword} iş ilanları`);

        return acc;
      }, [])
      .join(', ');

    return {
      title: headline.innerText,
      meta: [
        {
          name: 'description',
          content: headline.innerText,
        },
        {
          name: 'keywords',
          content: keywords,
        },
      ],
    };
  },
};
