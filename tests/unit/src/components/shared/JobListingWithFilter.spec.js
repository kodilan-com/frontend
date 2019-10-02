import { shallowMount, createLocalVue } from '@vue/test-utils';
import JobListingWithFilters from '@/components/shared/JobListingWithFilters';
import queryUtils from '@/utils/query';
import { JOB_TYPES_FOR_DROPDOWN } from '@/store/constants';

jest.mock('@/utils/query', () => ({
  getParams: jest.fn(),
}));

describe('JobListingWithFilters.vue', () => {
  let wrapper;
  const posts = [{
    slug: 'post1',
  }];
  const $router = {
    push: jest.fn(),
  };
  let $route;
  const localVue = createLocalVue();

  localVue.component('multiselect', {
    props: ['options', 'searchable', 'closeOnSelect'],
  });

  const renderComponent = (options) => {
    const componentOptions = {
      stubs: ['location-select', 'job-listing'],
      mocks: {
        $route,
        $router,
      },
      propsData: {
        posts,
      },
      localVue,
      ...options,
    };

    wrapper = shallowMount(JobListingWithFilters, componentOptions);
  };

  beforeEach(() => {
    $route = {
      query: {
        query: 'test_query',
        location: 'test_location',
        type: 'test_type',
      },
    };

    renderComponent();
  });

  afterEach(() => {
    wrapper.destroy();

    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should have data which generated with route query params', () => {
    expect(wrapper.vm.$data).toEqual({
      params: {
        location: 'test_location',
        query: 'test_query',
        type: 'test_type',
      },
      type: null,
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    });
  });

  it('should have data which generated with fallbacks', () => {
    $route = {
      query: {},
    };

    renderComponent();

    expect(wrapper.vm.$data).toEqual({
      params: {
        location: '',
        query: '',
        type: 1,
      },
      type: null,
      typeOptions: JOB_TYPES_FOR_DROPDOWN,
    });
  });

  describe('titlebar', () => {
    it('should not render titlebar div', () => {
      renderComponent({
        propsData: {
          isLoading: true,
          posts,
        },
      });

      expect(wrapper.find('#titlebar').exists()).toBe(false);
    });

    it('should render titlebar div, if isLoading prop is false', () => {
      expect(wrapper.find('#titlebar').exists()).toBe(true);
    });

    it('should match snapshot with "Bu kritere uygun ilan bulunamadı." text if posts length is 0', () => {
      renderComponent({
        propsData: {
          isLoading: false,
          posts: [],
        },
      });

      expect(wrapper.find('#titlebar').element).toMatchSnapshot();
    });

    it('should match snapshot with "Toplam 1 ilan bulunuyor" text if posts length is not 0 and $route path is "/ilanlar"', () => {
      renderComponent({
        propsData: {
          isLoading: false,
          posts,
        },
        mocks: {
          $route: {
            ...$route,
            path: '/ilanlar',
          },
        },
      });

      expect(wrapper.find('#titlebar span').text()).toBe('Toplam 1 ilan bulunuyor');
    });

    it('should match snapshot with "Bu kriterlere uygun 1 ilan bulunuyor" text if posts length is not 0 and $route path is "/ilanlar"', () => {
      renderComponent({
        propsData: {
          isLoading: false,
          posts,
        },
      });

      expect(wrapper.find('#titlebar span').text()).toBe('Bu kriterlere uygun 1 ilan bulunuyor');
    });
  });

  it('should have type object if query type is a parsable integer', () => {
    $route.query.type = '1';

    renderComponent();

    expect(wrapper.vm.type).toEqual({
      id: 1,
      text: 'Tam zamanlı',
    });
  });

  it('should have null type object if query type is not a parsable integer', () => {
    $route.query.type = 'not_parsable';

    renderComponent();

    expect(wrapper.vm.type).toEqual(null);
  });

  it('should have "empty" class if posts length is zero', () => {
    renderComponent({
      propsData: {
        posts: [],
      },
    });

    expect(wrapper.find('.job-listing').is('.empty')).toBe(true);
  });

  it('should pass isLoading and posts to JobListing component', () => {
    renderComponent({
      propsData: {
        isLoading: true,
        posts,
      },
    });

    expect(wrapper.find('job-listing-stub').props('isLoading')).toBe(true);
    expect(wrapper.find('job-listing-stub').props('posts')).toEqual(posts);
  });

  describe('widget', () => {
    it('should not be rendered, if isLoading is true', () => {
      renderComponent({
        propsData: {
          isLoading: true,
          posts,
        },
      });

      expect(wrapper.find('.five.columns').exists()).toBe(false);
    });

    it('should be rendered, if isLoading is false', () => {
      expect(wrapper.find('.five.columns .widget').exists()).toBe(true);
    });

    it('should match snapshot input, if isLoading is false', () => {
      expect(wrapper.find('.five.columns input').element).toMatchSnapshot();
    });

    it('should change "query" data, if types anything', () => {
      const input = wrapper.find('.five.columns input');

      input.element.value = 'test';
      input.trigger('input');

      expect(wrapper.vm.params.query).toBe('test');
    });

    it('should search typed "query" data, if press enter', () => {
      const input = wrapper.find('.five.columns input');
      const searchQuery = 'test';

      queryUtils.getParams.mockReturnValue('testParams');

      input.element.value = searchQuery;
      input.trigger('input');
      input.trigger('keypress.enter');

      expect(queryUtils.getParams.mock.calls[0][0]).toEqual({
        type: 0,
        query: searchQuery,
        location: 'test_location',
      });
      expect($router.push).toHaveBeenCalled();
      expect($router.push.mock.calls[0][0]).toEqual({ path: '/ilan-ara', query: 'testParams' });
    });

    it('should not search, if getParams function returns falsy value', () => {
      const input = wrapper.find('.five.columns input');

      wrapper.setData({
        type: {
          id: 'test_id',
        },
      });

      queryUtils.getParams.mockReturnValue(undefined);

      input.trigger('keypress.enter');

      expect($router.push).not.toHaveBeenCalled();
      expect(queryUtils.getParams.mock.calls[0][0]).toEqual({
        type: 'test_id',
        query: $route.query.query,
        location: $route.query.location,
      });
    });

    it('should render LocationSelect component with correct props, if isLoading is false', () => {
      const locationSelect = wrapper.find('location-select-stub');

      expect(locationSelect.exists()).toBe(true);
      expect(locationSelect.props('searchable')).toBe(true);
      expect(locationSelect.props('value')).toBe('test_location');
    });

    it('should render MultiSelect component with correct props, if isLoading is false', () => {
      const multiSelect = wrapper.find('multiselect-stub');


      expect(multiSelect.element).toMatchSnapshot();
      expect(multiSelect.props('closeOnSelect')).toBe(true);
      expect(multiSelect.props('searchable')).toBe(false);
      expect(multiSelect.props('options')).toEqual(JOB_TYPES_FOR_DROPDOWN);
    });

    it('should render search button, if isLoading is false', () => {
      const searchButton = wrapper.find('.button-right button');

      expect(searchButton.element).toMatchSnapshot();
    });

    it('should search, if search button is clicked when isLoading is false', () => {
      const searchButton = wrapper.find('.button-right button');

      queryUtils.getParams.mockReturnValue('testParams');

      searchButton.trigger('click');

      expect($router.push).toHaveBeenCalled();
      expect($router.push.mock.calls[0][0]).toEqual({ path: '/ilan-ara', query: 'testParams' });
    });
  });
});
