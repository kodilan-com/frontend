export default {
  metaInfo() {
    console.log(this);
    return {
      title: `${this.tag} etiketli iş ilanları - Kodilan.Com`,
      meta: [
        {
          name: 'keywords',
          content: `${this.tag} ilanları, ${this.tag} iş ilanları, İstanbul ${this.tag} iş ilanları, İzmir ${this.tag} iş ilanları, Ankara ${this.tag} iş ilanları`, // eslint-disable-line
        },
      ],
    };
  },
};
