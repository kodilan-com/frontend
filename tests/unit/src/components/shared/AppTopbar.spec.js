import { shallowMount } from '@vue/test-utils';
import AppTopbar from '@/components/shared/AppTopbar';

describe('AppTopbar.vue', () => {
  let wrapper;


  beforeEach(() => {
    wrapper = shallowMount(AppTopbar);
  });

  afterEach(() => {
    wrapper.destroy();

    jest.resetAllMocks();
  });

  it('should match with snapshot, if not clicked the "Bir daha gösterme." button before', () => {
    localStorage.getItem.mockReturnValue(undefined);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match with snapshot, if clicked the "Bir daha gösterme." button before', () => {
    localStorage.getItem.mockReturnValue(true);

    wrapper = shallowMount(AppTopbar);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not show the topbar section, if clicked the "Bir daha gösterme." button', () => {
    localStorage.getItem.mockReturnValue(undefined);

    wrapper.find('a[title="Bir daha gösterme."]').trigger('click');

    expect(wrapper.find('.is-topbar').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('isTopbarClosed', true);
  });
});
