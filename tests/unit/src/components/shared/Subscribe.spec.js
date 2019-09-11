import Subscribe from '@/components/shared/Subscribe';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Multiselect from 'vue-multiselect';

const localVue = createLocalVue();
const modalStub = {
  show: jest.fn(),
};

localVue.use(Vuex);
localVue.use({
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$modal = modalStub;
  },
});

localVue.component('multiselect', Multiselect);

describe('Subscribe.vue', () => {
  let wrapper;
  let storeStub;
  let store;

  beforeEach(() => {
    storeStub = {
      actions: {
        subscribe: jest.fn(),
      },
    };
    store = new Vuex.Store(storeStub);

    wrapper = shallowMount(Subscribe, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();

    wrapper.destroy();
  });

  it('should be shown if isVisible is true', () => {
    expect(wrapper.find('.subscribe-widget')
      .exists())
      .toBeTruthy();
    expect(wrapper.element)
      .toMatchSnapshot();
  });

  it('should be shown if isClosed is false and not subscribeClosed before', () => {
    localStorage.getItem.mockReturnValue(false);

    wrapper.setProps({
      fixed: true,
    });

    expect(wrapper.find('.subscribe-widget')
      .exists())
      .toBeTruthy();
  });

  it('should not be shown if isClosed is true', () => {
    wrapper.setProps({
      fixed: true,
    });

    wrapper.setData({
      isClosed: true,
    });

    expect(wrapper.find('.subscribe-widget')
      .exists())
      .toBeFalsy();
  });

  it('should not be shown if subscribeClosed before', () => {
    localStorage.getItem.mockReturnValue(true);

    wrapper.setProps({
      fixed: true,
    });

    expect(wrapper.find('.subscribe-widget')
      .exists())
      .toBeFalsy();
  });

  it('should call close method if "Bir daha gösterme :(" is clicked', async () => {
    wrapper.setProps({
      fixed: true,
    });

    await localVue.nextTick();

    wrapper.find('.close')
      .trigger('click');

    expect(wrapper.vm.isClosed)
      .toBe(true);
    expect(localStorage.setItem)
      .toBeCalledWith('subscribeClosed', true);
  });

  it('should not call subscribe action if isClosed is true', () => {
    wrapper.setData({
      isClosed: true,
    });

    wrapper.find('input[placeholder="Email"]')
      .trigger('keyup.enter');

    expect(storeStub.actions.subscribe)
      .not
      .toBeCalled();
  });

  it('should call subscribe action showDialog method with success message if isClosed is false', (done) => {
    const closeStub = jest.fn();

    storeStub.actions.subscribe.mockResolvedValue({});

    wrapper.setData({
      isClosed: false,
      name: 'testName',
      email: 'testMail',
    });
    wrapper.setMethods({
      close: closeStub,
    });

    wrapper.find('input[placeholder="Email"]')
      .trigger('keyup.enter');

    expect(storeStub.actions.subscribe.mock.calls[0][1])
      .toEqual({
        email: 'testMail',
        frequency: 'weekly',
        name: 'testName',
      });

    setTimeout(() => {
      expect(closeStub)
        .toBeCalled();
      expect(modalStub.show)
        .toBeCalledWith('dialog', {
          buttons: [{ title: 'Kapat' }],
          text: undefined,
          title: 'Email listesine kaydınız gerçekleştirildi.',
        });

      done();
    });
  });

  it('should call subscribe action and showDialog method with error message if isClosed is false ', (done) => {
    const closeStub = jest.fn();
    const error = {
      response: {
        data: {
          errors: [['testError']],
        },
      },
    };

    storeStub.actions.subscribe.mockRejectedValue(error);

    wrapper.setData({
      isClosed: false,
      name: 'testName',
      email: 'testMail',
    });
    wrapper.setMethods({
      close: closeStub,
    });

    wrapper.find('input[placeholder="Email"]')
      .trigger('keyup.enter');

    expect(storeStub.actions.subscribe.mock.calls[0][1])
      .toEqual({
        email: 'testMail',
        frequency: 'weekly',
        name: 'testName',
      });

    setTimeout(() => {
      expect(closeStub)
        .not
        .toBeCalled();
      expect(modalStub.show)
        .toBeCalledWith('dialog', {
          buttons: [{ title: 'Kapat' }],
          text: '<ul><li>testError</li></ul>',
          title: 'Hata: Kaydınız gerçekleştirilemedi.',
        });

      done();
    });
  });

  it('should call subscribe action and showDialog method with empty error list message if isClosed is false ', (done) => {
    const closeStub = jest.fn();
    const error = {
      response: {
        data: {},
      },
    };

    storeStub.actions.subscribe.mockRejectedValue(error);

    wrapper.setData({
      isClosed: false,
      name: 'testName',
      email: 'testMail',
    });
    wrapper.setMethods({
      close: closeStub,
    });

    wrapper.find('.button')
      .trigger('click');

    expect(storeStub.actions.subscribe.mock.calls[0][1])
      .toEqual({
        email: 'testMail',
        frequency: 'weekly',
        name: 'testName',
      });

    setTimeout(() => {
      expect(closeStub)
        .not
        .toBeCalled();
      expect(modalStub.show)
        .toBeCalledWith('dialog', {
          buttons: [{ title: 'Kapat' }],
          text: '<ul></ul>',
          title: 'Hata: Kaydınız gerçekleştirilemedi.',
        });

      done();
    });
  });
});
