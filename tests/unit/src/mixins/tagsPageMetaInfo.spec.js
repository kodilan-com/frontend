import tagsPageMetaInfo from '@/mixins/tagsPageMetaInfo';

describe('searchPageMetaInfo mixin', () => {
  const generateMixin = objectValue => ({
    ...tagsPageMetaInfo,
    ...objectValue,
  });

  describe('metaInfo method', () => {
    it('should return meta info', () => {
      const object = {
        tag: 'testTag',
      };

      const mixin = generateMixin(object);
      const result = mixin.metaInfo();

      expect(result)
        .toEqual({
          meta: [{
            content: 'testTag ilanları, testTag iş ilanları, İstanbul testTag iş ilanları, İzmir testTag iş ilanları, Ankara testTag iş ilanları',
            name: 'keywords',
          }],
        });
    });
  });
});
