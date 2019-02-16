export default {
  metaInfo() {
    if (this.isLoading) {
      return {};
    }

    const { position } = this.post;
    const companyName = this.post.company.name;
    const defaultKeywords = ['iş ilanları, yazılım iş ilanları, bilişim iş ilanları'];
    const description = `${companyName} ${position} pozisyonunda eleman arıyor`;
    const { twitter } = this.post.company;
    const twitterHandle = twitter ? `@${twitter}` : '';

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
          name: 'twitter:card',
          content: description,
        },
        {
          name: 'twitter:creator',
          content: twitterHandle,
        },
        {
          name: 'og:url',
          content: this.post.post_url,
        },
      ],
    };
  },
};
