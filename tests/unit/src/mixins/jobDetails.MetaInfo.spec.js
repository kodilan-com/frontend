import jobDetailsMetaInfo from '@/mixins/jobDetailsMetaInfo';

describe('jobDetailsMetaInfo mixin', () => {
  const generateMixin = objectValue => ({
    ...jobDetailsMetaInfo,
    ...objectValue,
  });

  describe('metaInfo method', () => {
    it('should return empty object {}  when isLoading is true', () => {
      const mixin = generateMixin({ isLoading: true });
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({});
    });

    it('should return empty object {}  when notFound is true', () => {
      const mixin = generateMixin({ notFound: true });
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({});
    });

    it('should return meta infos with twitter account name if isLoading and notFound is false', () => {
      const object = {
        notFound: false,
        isLoading: false,
        post: {
          post_url: 'testPostUrl',
          position: 'testPosition',
          company: {
            name: 'testCompanyName',
            twitter: 'companyTwitter',
            logo: 'testLogo',
          },
          tags: [{ name: 'test1' }, { name: 'test2' }],
        },
      };
      const mixin = generateMixin(object);
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({
          meta: [{
            content: 'testPosition, testPosition iş ilanları, testCompanyName testPosition pozisyonunda takım arkadaşı arıyor, Kodilan.com yazılım ve bilişim sektörüne ait güncel iş ilanlarının doğru adresi',
            name: 'description',
          }, {
            content: 'test1, test2, iş ilanları, yazılım iş ilanları, bilişim iş ilanları',
            name: 'keywords',
          }, {
            content: 'testLogo',
            name: 'og:image',
          }, {
            content: 'testCompanyName testPosition pozisyonunda takım arkadaşı arıyor',
            name: 'og:description',
          }, {
            content: 'testCompanyName testPosition iş ilanı',
            name: 'og:title',
          }, {
            content: 'testPostUrl',
            name: 'og:url',
          }, {
            content: 'testCompanyName testPosition pozisyonunda takım arkadaşı arıyor',
            name: 'twitter:description',
          }, {
            content: '@companyTwitter',
            name: 'twitter:creator',
          }],
          title: 'testPosition | testCompanyName',
        });
    });

    it('should return meta infos with empty twitter account name if isLoading, notFound is false and twitter field is undefined', () => {
      const object = {
        notFound: false,
        isLoading: false,
        post: {
          position: 'testPosition',
          post_url: 'testPostUrl',
          company: {
            name: 'testCompanyName',
            logo: 'testLogo',
          },
          tags: [{ name: 'test1' }, { name: 'test2' }],
        },
      };
      const mixin = generateMixin(object);
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({
          meta: [{
            content: 'testPosition, testPosition iş ilanları, testCompanyName testPosition pozisyonunda takım arkadaşı arıyor, Kodilan.com yazılım ve bilişim sektörüne ait güncel iş ilanlarının doğru adresi',
            name: 'description',
          }, {
            content: 'test1, test2, iş ilanları, yazılım iş ilanları, bilişim iş ilanları',
            name: 'keywords',
          }, {
            content: 'testLogo',
            name: 'og:image',
          }, {
            content: 'testCompanyName testPosition pozisyonunda takım arkadaşı arıyor',
            name: 'og:description',
          }, {
            content: 'testCompanyName testPosition iş ilanı',
            name: 'og:title',
          }, {
            content: 'testPostUrl',
            name: 'og:url',
          }, {
            content: 'testCompanyName testPosition pozisyonunda takım arkadaşı arıyor',
            name: 'twitter:description',
          }, {
            content: '',
            name: 'twitter:creator',
          }],
          title: 'testPosition | testCompanyName',
        });
    });
  });
});
