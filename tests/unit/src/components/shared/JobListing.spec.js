import { shallowMount } from '@vue/test-utils';
import JobListing from '@/components/shared/JobListing';

describe('JobListing.vue', () => {
  const posts = [{
    slug: 'post1',
  }];
  let wrapper;

  const renderComponent = (options) => {
    const componentOptions = {
      stubs: ['loader', 'job-item'],
      propsData: {
        posts,
      },
      ...options,
    };

    wrapper = shallowMount(JobListing, componentOptions);
  };

  beforeEach(() => {
    renderComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should not render loader component, if isLoading props is not pass', () => {
    const loader = wrapper.find('loader-stub');

    expect(loader.exists()).toBe(false);
  });

  it('should render loader component, if isLoading props is pass as true', () => {
    renderComponent({
      propsData: {
        posts,
        isLoading: true,
      },
    });

    const loader = wrapper.find('loader-stub');

    expect(loader.exists()).toBe(true);
  });

  it('should render notification div, if posts prop is pass as empty array and isLoading is false', () => {
    renderComponent({
      propsData: {
        posts: [],
        isLoading: false,
      },
    });

    const notification = wrapper.find('.notification');

    expect(notification.exists()).toBe(true);
    expect(notification.text()).toBe('İlan bulunamadı.');
  });

  it('should render passed notification message, if posts prop is pass as empty array, isLoading is false and notFoundText is passed a string', () => {
    renderComponent({
      propsData: {
        posts: [],
        isLoading: false,
        notFoundText: 'NOT_FOUND_TEST',
      },
    });

    const notification = wrapper.find('.notification');

    expect(notification.exists()).toBe(true);
    expect(notification.text()).toBe('NOT_FOUND_TEST');
  });

  it('should JobItem component, if posts prop is pass as not an empty array and isLoading is false', () => {
    renderComponent({
      propsData: {
        posts,
        isLoading: false,
      },
    });

    const notification = wrapper.find('.notification');
    const jobItem = wrapper.find('job-item-stub');

    expect(notification.exists()).toBe(false);
    expect(jobItem.exists()).toBe(true);
    expect(jobItem.props('post')).toEqual(posts[0]);
  });
});
