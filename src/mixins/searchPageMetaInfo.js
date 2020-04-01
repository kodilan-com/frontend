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
        acc.push(`ankara ${keyword} iş ilanları`);
        acc.push(`izmir ${keyword} iş ilanları`);

        return acc;
      }, [])
      .join(', ');
console.log(this);
    return {
      title: `${this.query||this.jobTypeString||this.queryString.location} için iş ilanları - Kodilan.Com`,
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
