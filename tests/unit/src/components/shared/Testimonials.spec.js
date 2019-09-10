import Testimonials from '@/components/shared/Testimonials';
import { shallowMount } from '@vue/test-utils';

describe('Testimonials.vue', () => {
  it('should match with snapshot', () => {
    const wrapper = shallowMount(Testimonials);

    expect(wrapper.element).toMatchSnapshot();
  });
});
