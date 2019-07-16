import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import JobItem from '@/components/shared/JobItem';
import jobDetail from '@/mixins/jobDetail';
import image from '@/mixins/image';

jest.mock('@/mixins/jobDetail');
jest.mock('@/mixins/image');

describe('JobItem.vue', () => {
  let post;
  let company;
  let timeago;
  let wrapper;

  beforeEach(() => {
    post = {
      position: 'TEST_POSITION',
      location: 'TEST_LOCATION',
      tags: [
        { slug: 'TEST_SLUG_1', name: 'TEST_SLUG_NAME_1' },
        { slug: 'TEST_SLUG_2', name: 'TEST_SLUG_NAME_2' },
      ],
    };
    company = {
      logo: 'TEST_LOGO',
      name: 'TEST_NAME',
      slug: 'TEST_SLUG',
    };
    timeago = 'TEST_TIME_AGO';

    jobDetail.computed.company.mockReturnValue(company);
    jobDetail.computed.detailsUrl.mockReturnValue('TEST_URL');
    jobDetail.computed.postTypeClassName.mockReturnValue('TEST_CLASS_NAME');
    jobDetail.computed.timeago.mockReturnValue(timeago);

    image.methods.handleImageError = jest.fn();

    wrapper = shallowMount(JobItem, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        post,
      },
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a router-link with "TEST_URL" href for listing', () => {
    expect(wrapper.find(RouterLinkStub).props().to).toBe('TEST_URL');
  });

  it('should execute handleImageError if any error occurs while loading image', () => {
    const imageElement = wrapper.find('img');

    imageElement.trigger('error');

    expect(image.methods.handleImageError).toHaveBeenCalled();
  });

  it('should pass post to JobTypeBadge component', () => {
    const jobTypeBadge = wrapper.find('job-type-badge-stub');

    expect(jobTypeBadge.props('post')).toBe(post);
  });

  it('should be correct company url for company', () => {
    const companyLink = wrapper.find('ul.listing-icons li:nth-child(1) a');

    expect(companyLink.props('to')).toEqual('/firmalar/TEST_SLUG');
  });

  it('should be correct location url icons for company', () => {
    const companyLocationLink = wrapper.find('ul.listing-icons li:nth-child(2) a');

    expect(companyLocationLink.props('to')).toEqual(`/ilan-ara?location=${post.location}`);
  });

  it('should be correct ur for company slug', () => {
    const allLinks = wrapper.findAll('a.tag-post-tag').wrappers;

    expect(
      allLinks.map(link => link.props('to')),
    ).toEqual(post.tags.map(tag => `/etiket/${tag.slug}`));
  });
});
