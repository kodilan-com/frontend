import RecentJobsList from '@/components/shared/RecentJobsList';
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils';
import Vuex from 'vuex';
import { PERIODS } from '@/store/constants';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('RecentJobsList.vue', () => {
  let wrapper;
  let storeStub;
  let store;
  const setPeriodHandlerStub = jest.fn();
  let $route;
  const renderWrapper = (props, methods) => {
    wrapper = shallowMount(RecentJobsList, {
      localVue,
      store,
      mocks: {
        $route,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
      propsData: {
        ...props,
      },
      methods: {
        ...methods,
      },
    });
  };

  beforeEach(() => {
    $route = {
      meta: {
        period: '',
      },
    };
    storeStub = {
      state: {
        recentPosts: ['test1', 'test2'],
        activePeriod: 'testPeriod',
      },
      actions: {
        fetchRecentPosts: jest.fn(),
        setPeriod: jest.fn(),
      },
    };

    store = new Vuex.Store(storeStub);

    renderWrapper();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();

    wrapper.destroy();
  });

  it('should match with snapshot', () => {
    renderWrapper({}, { setPeriodHandler: setPeriodHandlerStub });

    expect(wrapper.element)
      .toMatchSnapshot();
  });

  it('should call setPeriodHandler method on initial', async () => {
    renderWrapper({}, { setPeriodHandler: setPeriodHandlerStub });

    await localVue.nextTick();

    expect(setPeriodHandlerStub)
      .toBeCalled();
  });

  it('should set "/ilanlar" to link', () => {
    renderWrapper({}, { setPeriodHandler: setPeriodHandlerStub });

    expect(wrapper.find('.tag-all-posts')
      .props('to'))
      .toBe('/ilanlar');
  });

  it('should not render link if isLoading is true', async () => {
    renderWrapper({}, { setPeriodHandler: setPeriodHandlerStub });

    wrapper.setData({
      isLoading: true,
    });

    await localVue.nextTick();

    expect(wrapper.find('.tag-all-posts')
      .exists())
      .toBe(false);
  });

  it('should call fetch method and set period if route period exists in PERIODS', () => {
    const fetchStub = jest.fn();
    const setPeriodStub = jest.fn();

    $route.meta.period = PERIODS[1].type;

    renderWrapper({}, {
      setPeriod: setPeriodStub,
      fetch: fetchStub,
    });

    wrapper.vm.setPeriodHandler();

    expect(fetchStub)
      .toBeCalled();
    expect(setPeriodStub)
      .toBeCalledWith(PERIODS[1].type);
  });

  it('should call fetch method and not set period if route period not exists in PERIODS', () => {
    const fetchStub = jest.fn();
    const setPeriodStub = jest.fn();

    $route.meta.period = 'notExists';

    renderWrapper({}, { setPeriod: setPeriodStub, fetch: fetchStub });

    wrapper.vm.setPeriodHandler();

    expect(fetchStub).toBeCalled();
    expect(setPeriodStub).not.toBeCalled();
  });
});
