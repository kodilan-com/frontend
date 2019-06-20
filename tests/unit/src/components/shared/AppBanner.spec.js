import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppBanner from '@/components/shared/AppBanner.vue';
import queryUtils from '@/utils/query';

describe('AppBanner.vue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('data', () => {
    it('should have "query" and "location" properties', () => {
      const defaultComponentState = {
        params: {
          query: '',
          location: ''
        }
      };
      const componentState = AppBanner.data();

      expect(defaultComponentState).toEqual(componentState);
    })
  });

  describe('methods', () => {
    describe('handleSearch', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallowMount(AppBanner, {
          stubs: ['router-link'],
          mocks: {
            $router: {
              push: jest.fn()
            }
          }
        });
      });

      it('should not push to router the "ilan-ara" path, if "params" is false', () => {
        queryUtils.getParams = jest.fn(() => false);

        wrapper.vm.handleSearch();
        queryUtils.getParams.mockRestore()
        expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
      })

      it('should push to router the "ilan-ara" path with "test-param" query string, if "params" is return "test-param"', () => {
        queryUtils.getParams = jest.fn(() => "test-params");

        wrapper.vm.handleSearch();

        expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$router.push).toBeCalledWith({
          path: 'ilan-ara',
          query: 'test-params'
        });
      })
    })
  });

  describe('template', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMount(AppBanner, {
        stubs: ['router-link'],
      });
    });

    it('should match the snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('should execute "handleSearch" method if enter is pressed in searchbox', () => {
      wrapper.setMethods({ handleSearch: jest.fn() })
      
      wrapper.find('input.ico-01').trigger('keypress.enter');

      expect(wrapper.vm.handleSearch).toHaveBeenCalledTimes(1);
    });

    it('should execute "handleSearch" method if click the search button', () => {
      wrapper.setMethods({ handleSearch: jest.fn() })

      wrapper.find('button.tag-search-btn').trigger('click');

      expect(wrapper.vm.handleSearch).toHaveBeenCalledTimes(1);
    });
  });
})
