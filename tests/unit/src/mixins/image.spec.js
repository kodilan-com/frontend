import image from '@/mixins/image';

const emptyLogo = require('@/assets/images/empty-company-logo.png');

describe('mixins/image', () => {
  const mixed = {
    ...image.methods,
    $refs: {
      logo: {
        src: '',
      },
    },
  };

  it('should set empty logo', () => {
    mixed.handleImageError();

    expect(mixed.$refs.logo.src).toBe(emptyLogo);
  });
});
