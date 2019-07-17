import { shallowMount } from '@vue/test-utils';
import InfoBanner from '@/components/shared/InfoBanner';

describe('InfoBanner.vue', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(InfoBanner, {
      stubs: ['router-link'],
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
