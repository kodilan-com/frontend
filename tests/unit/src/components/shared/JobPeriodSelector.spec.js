import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import JobPeriodSelector from '@/components/shared/JobPeriodSelector';
import { PERIODS } from '@/store/constants';

import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('JobPeriodSelector.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        activePeriod: 'N/A',
      },
      action: {
        setPeriod: jest.fn(),
      },
    });

    wrapper = shallowMount(JobPeriodSelector, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
      store,
      localVue,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('should have 3 periods', () => {
    const periods = wrapper.findAll('ul.tabs-nav li');

    expect(periods.length).toBe(3);
    expect(periods.wrappers.map(period => period.find('a').props('to')))
      .toEqual(PERIODS.map(period => `/${period.slug}`));
    expect(periods.wrappers.map(period => period.find('a').text()))
      .toEqual(PERIODS.map(period => period.text));
  });

  it('should not have active tab', () => {
    expect(wrapper.find('ul.active').exists()).toBe(false);
  });

  it('should have active tab', () => {
    expect(wrapper.find('ul.tabs-nav li.active').exists()).toBe(false);
  });

  it('should have right part', () => {
    const rightPart = wrapper.find('.ul.tabs-nav.is-right');

    expect(rightPart.element).toMatchSnapshot();
    expect(rightPart.find('a').props('to')).toBe('/ilanlar');
  });
});
