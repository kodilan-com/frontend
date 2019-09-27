import searchPageMetaInfo from '@/mixins/searchPageMetaInfo';

describe('searchPageMetaInfo mixin', () => {
  const generateMixin = objectValue => ({
    ...searchPageMetaInfo,
    ...objectValue,
  });

  describe('metaInfo method', () => {
    it('should return empty object {}  when isLoading is true', () => {
      const mixin = generateMixin({ isLoading: true });
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({});
    });

    it('should return empty object {} if headline ref does not exist', () => {
      const mixin = generateMixin({
        isLoading: false,
        $refs: {},
      });
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({});
    });

    it('should return meta info', () => {
      const object = {
        isLoading: false,
        $refs: {
          headline: {
            innerText: 'testInnerText',
            querySelectorAll: jest.fn(),
          },
        },
      };

      object.$refs.headline.querySelectorAll
        .mockReturnValue([{ innerText: 'testInnerText1' }, { innerText: 'testInnerText2' }]);

      const mixin = generateMixin(object);
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({
          meta: [{
            content: 'testInnerText',
            name: 'description',
          }, {
            content: 'testInnerText1 iş ilanları, istanbul testInnerText1 iş ilanları, testInnerText2 iş ilanları, istanbul testInnerText2 iş ilanları',
            name: 'keywords',
          }],
        });
    });
  });
});
