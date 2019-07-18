export default {
  rankPosts(post, postTagSlugs, relatedPosts) {
    const DAY_IN_MS = 1000 * 60 * 60 * 24;
    const TODAY = new Date();
    const POINTS = {
      createdInTenDays: 2,
      fromSameCompany: 3,
      hasSamePostType: 4,
      hasSameTag: 5,
      inSameLocation: 6,
    };

    return relatedPosts
      .filter(p => p.slug !== post.slug)
      .map((p) => {
        let score = 0;

        score += p.location === post.location ? POINTS.inSameLocation : 0;
        score += p.company.slug === post.company.slug ? POINTS.fromSameCompany : 0;
        score += p.type === post.type ? POINTS.hasSamePostType : 0;
        score += (TODAY - new Date(p.updated_at)) / DAY_IN_MS <= 10 ? POINTS.createdInTenDays : 0;
        p.tags.forEach((t) => {
          score += postTagSlugs.indexOf(t.slug) > -1 ? POINTS.hasSameTag : 0;
        });

        return { score, post: p };
      })
      .sort((c, n) => (c.score > n.score ? -1 : 1))
      .slice(0, 3)
      .map(o => o.post);
  },
};
