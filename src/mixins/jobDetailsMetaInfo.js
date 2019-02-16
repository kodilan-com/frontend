export default {
  metaInfo() {
    if (this.isLoading) {
      return {};
    }

    const { position } = this.post;
    const companyName = this.post.company.name;
    const defaultKeywords = ['iş ilanları, yazılım iş ilanları, bilişim iş ilanları'];
    const description = `${companyName} ${position} pozisyonunda takım arkadaşı arıyor`;
    const { twitter } = this.post.company;
    const twitterHandle = twitter ? `@${twitter}` : '';
    const ogTitle = `${companyName} ${position} iş ilanı`;

    const keywords = this.post.tags.map(tag => tag.name)
      .concat(defaultKeywords)
      .join(', ');

    return {
      title: `${position} | ${companyName}`,
      meta: [
        {
          name: 'description',
          content: `${position}, ${position} iş ilanları, ${description}, Kodilan.com yazılım ve bilişim sektörüne ait güncel iş ilanlarının doğru adresi`, // eslint-disable-line
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          name: 'og:image',
          content: this.post.company.logo,
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
          content: this.post.post_url,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:creator',
          content: twitterHandle,
        },
      ],
    };
  },
};
