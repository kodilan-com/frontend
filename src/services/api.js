import db from './firestore';

const collections = {
  POSTS: 'posts',
  COMPANIES: 'companies',
  TAGS: 'tags',
};

export default {
  fetchData() {
    return this.fetchTags().then((tags) => {
      return this.fetchCompanies().then((companies) => {
        return this.fetchPosts().then((posts) => {
          return { tags, companies, posts };
        });
      });
    });
  },

  fetch(collectionName) {
    return db
      .collection(collectionName)
      .get()
      .then(docSnapshot =>
        docSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            ...data,
            id: doc.id,
          };
        }),
      );
  },

  fetchTags() {
    return this.fetch(collections.TAGS);
  },

  fetchPosts() {
    return this.fetch(collections.POSTS);
  },

  fetchCompanies() {
    return this.fetch(collections.COMPANIES);
  },
};
