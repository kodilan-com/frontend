import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import JobSpotlight from '@/components/shared/JobSpotlight';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('JobSpotlight.vue', () => {
  let store;
  let jobSpotlightStore;
  let wrapper;
  const renderComponent = () => {
    wrapper = shallowMount(JobSpotlight, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      localVue,
      store,
    });
  };
  const getHrefs = selector => wrapper.findAll(selector).wrappers.map(job => job.props('to'));

  beforeEach(() => {
    jobSpotlightStore = {
      state: {
        featuredPosts: [{
          slug: 'slug-1',
          location: 'postLocation1',
          description: 'Post Description 1',
          company: {
            name: 'Company Name 1',
            slug: 'company-slug-1',
          },
          tags: [{
            slug: 'post-1-tag-1',
            name: 'Post 1 Tag 1 Name',
          }, {
            slug: 'post-1-tag-2',
            name: 'Post 1 Tag 2 Name',
          }],
        }],
      },
      actions: {
        fetchFeaturedPosts: jest.fn(),
      },
    };
    store = new Vuex.Store(jobSpotlightStore);

    renderComponent();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should show loader when fetching featured posts is done', (done) => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(100);

    jobSpotlightStore.actions.fetchFeaturedPosts.mockResolvedValue(true);

    renderComponent();

    expect(jobSpotlightStore.actions.fetchFeaturedPosts).toBeCalled();
    expect(wrapper.find('loader-stub').exists()).toBe(true);
    jest.useRealTimers();


    setTimeout(() => {
      expect(wrapper.find('loader-stub').exists()).toBe(false);

      done();
    }, 101);
  });

  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should cuts the description and put three dots on the end if description length is greater then 200', async () => {
    jobSpotlightStore.state.featuredPosts[0].description = global.dummy.string(201);

    renderComponent();

    await localVue.nextTick();

    expect(wrapper.find('.details p').text().length).toBe(203);
  });

  it('should pass the post to JobTypeBadge component', () => {
    expect(wrapper.find('job-type-badge-stub').props('post')).toEqual(jobSpotlightStore.state.featuredPosts[0]);
  });

  it('should generate job url correctly', () => {
    expect(getHrefs('.job-title'))
      .toEqual(jobSpotlightStore.state.featuredPosts.map(post => `/ilanlar/${post.slug}`));
    expect(getHrefs('.button.tag-go-featured-post'))
      .toEqual(jobSpotlightStore.state.featuredPosts.map(post => `/ilanlar/${post.slug}`));
  });

  it('should generate company links correctly', () => {
    expect(getHrefs('.fa.fa-briefcase + a'))
      .toEqual(jobSpotlightStore.state.featuredPosts.map(post => `/firmalar/${post.company.slug}`));
  });

  it('should generate post location links correctly', () => {
    expect(getHrefs('.fa.fa-map-marker + a'))
      .toEqual(
        jobSpotlightStore.state.featuredPosts.map(post => `/ilan-ara/${post.location}`),
      );
  });

  it('should generate post tags link correctly', () => {
    expect(getHrefs('.listing-date.post-tag a'))
      .toEqual(jobSpotlightStore.state.featuredPosts
        .flatMap(post => post.tags.map(tag => `/etiket/${tag.slug}`)));
  });

  it('should getPostSummary ignore html tags while calculating description length', () => {
    const description = global.dummy.string(200);

    expect(wrapper.vm.getPostSummary(`<div>${description}</div>`))
      .toBe(description);
  });

  it('should getPostSummary return empty string if description is empty', () => {
    expect(wrapper.vm.getPostSummary(''))
      .toBe('');
  });
});
