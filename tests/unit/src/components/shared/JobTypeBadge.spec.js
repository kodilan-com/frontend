import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import JobTypeBadge from '@/components/shared/JobTypeBadge';
import jobDetail from '@/mixins/jobDetail';

jest.mock('@/mixins/jobDetail', () => ({
  props: {
    post: {
      type: Object,
    },
  },
  computed: {
    jobType: jest.fn(),
    postTypeLink: () => 'test-link',
    postTypeClassName: () => 'test-class-name',
  },
}));

describe('JobTypeBadge.vue', () => {
  let wrapper;
  const renderComponent = (type) => {
    wrapper = shallowMount(JobTypeBadge, {
      propsData: {
        post: {
          type: type || '1',
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  };

  beforeEach(() => {
    jobDetail.computed.jobType.mockReturnValue('test');

    renderComponent();
  });

  afterEach(() => {
    jest.restoreAllMocks();

    wrapper.destroy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot, if there jobType is not falsy', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should return undefined, if there jobType is falsy', () => {
    jobDetail.computed.jobType.mockReturnValue('');

    renderComponent();

    expect(wrapper.html()).toBe(undefined);
  });

  it('should render correct post type link', () => {
    expect(wrapper.find('a.tag-post-type').props('to')).toBe('/ilan-ara/tam-zamanli');

    renderComponent('2');

    expect(wrapper.find('a.tag-post-type').props('to')).toBe('/ilan-ara/yari-zamanli');

    renderComponent('3');

    expect(wrapper.find('a.tag-post-type').props('to')).toBe('/ilan-ara/stajyer');

    renderComponent('4');

    expect(wrapper.find('a.tag-post-type').props('to')).toBe('/ilan-ara/freelance');
  });
});
