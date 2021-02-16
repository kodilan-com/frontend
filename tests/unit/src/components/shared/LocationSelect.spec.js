import LocationSelect from '@/components/shared/LocationSelect';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Multiselect from 'vue-multiselect';
import Vuex from 'vuex';
import allLocations from '@/assets/data/locations';

const localVue = createLocalVue();

localVue.component('multiselect', Multiselect);
localVue.use(Vuex);

describe('LocationSelect.vue', () => {
  let wrapper;
  let storeStub;
  let store;
  const renderWrapper = (props) => {
    wrapper = shallowMount(LocationSelect, {
      localVue,
      store,
      propsData: {
        ...props,
      },
    });
  };

  beforeEach(() => {
    storeStub = {
      state: {
        availableLocations: ['test1', 'test2'],
      },
      actions: {
        fetchAvailableLocations: jest.fn(),
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

  it('should match with snapshot on initial', () => {
    expect(wrapper.element)
      .toMatchSnapshot();
  });

  it('should set "is-searchable" class to multiselect component when searchable prop is given as true', () => {
    renderWrapper({ searchable: true });

    expect(wrapper.find('multiselect-stub').attributes('class')).toBe('is-searchable');
  });

  it('should call fetchAvailableLocations action on initial', async () => {
    storeStub.actions.fetchAvailableLocations.mockResolvedValue({});

    renderWrapper();

    await localVue.nextTick();

    expect(storeStub.actions.fetchAvailableLocations)
      .toBeCalled();
    expect(wrapper.find('multiselect-stub')
      .attributes('options'))
      .toEqual(storeStub.state.availableLocations.join(','));
  });

  it('should show all locations if showAll is passed as true', async () => {
    storeStub.actions.fetchAvailableLocations.mockResolvedValue({});

    renderWrapper({ showAll: true });

    await localVue.nextTick();

    expect(storeStub.actions.fetchAvailableLocations)
      .toBeCalled();
    expect(wrapper.vm.options)
      .toEqual(allLocations);
    expect(wrapper.find('multiselect-stub')
      .attributes('options'))
      .toEqual(allLocations.join(','));
  });

  it('should assign given value to selected data', () => {
    renderWrapper({ value: 'newValue' });

    expect(wrapper.vm.selected).toBe('newValue');
  });

  it('should be set selected data to null on initial if value prop is not given', () => {
    expect(wrapper.vm.selected).toBe(null);
  });

  it('should emit input event', () => {
    const value = 'test';

    wrapper.vm.handleChange(value);

    expect(wrapper.emitted('input')[0][0]).toBe(value);
  });

  it('should set locations to options if given text is empty', () => {
    const text = '  ';

    wrapper.vm.searchChange(text);

    expect(wrapper.vm.options).toEqual(storeStub.state.availableLocations);
  });

  it('should show only contained locations', () => {
    const text = storeStub.state.availableLocations[0];

    wrapper.vm.searchChange(text);

    expect(wrapper.vm.options).toEqual(storeStub.state.availableLocations.slice(0, 1));
  });

  it('should call syncValue methods when value prop and selected data is different', (done) => {
    const mockMethods = {
      syncValue: jest.fn(),
    };

    renderWrapper();

    wrapper.setMethods({
      ...mockMethods,
    });
    wrapper.setData({
      selected: 'selected',
    });
    wrapper.setProps({
      value: 'changed',
    });

    expect(mockMethods.syncValue).toBeCalled();

    done();
  });

  it('should not call syncValue methods when value prop and selected data is not different', (done) => {
    const mockMethods = {
      syncValue: jest.fn(),
    };

    renderWrapper();

    wrapper.setMethods({
      ...mockMethods,
    });
    wrapper.setData({
      selected: 'changed',
    });
    wrapper.setProps({
      value: 'changed',
    });

    expect(mockMethods.syncValue).not.toBeCalled();

    done();
  });
});
