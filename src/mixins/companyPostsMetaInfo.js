export default {
  metaInfo() {
    if (this.isLoading || this.notFound || this.posts.length === 0) {
      return {};
    }

    const { company } = this.posts[0];
    const companyName = company.name;
    const defaultKeywords = ['iş ilanları, yazılım iş ilanları, bilişim iş ilanları'];
    const description = `${companyName} firması takım arkadaşları arıyor`;
    const ogTitle = `${companyName} iş ilanları`;

    const keywords = this.posts[0].tags.map(tag => tag.name)
      .concat(defaultKeywords)
      .join(', ');

    return {
      title: `${companyName} firmasına ait ilanlar`,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          name: 'og:image',
          content: company.logo,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:title',
          content: ogTitle,
        },
        {
          name: 'og:url',
          content: this.posts[0].post_url,
        },
      ],
    };
  },
};
