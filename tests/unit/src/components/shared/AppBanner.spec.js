import { shallowMount, createLocalVue } from '@vue/test-utils';
import AppBanner from '@/components/shared/AppBanner.vue';
import queryUtils from '@/utils/query';
import LocationSelect from '@/components/shared/LocationSelect.vue';

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

    it('should render 4 job position links for browse jobs', () => {
      const jobCategoryLinks = wrapper.findAll('.browse-jobs:not(.next-line) .tag-header-tags')
      const categories = jobCategoryLinks.wrappers.map(link => {
        return link.text();
      });

      expect(jobCategoryLinks.length).toEqual(4);
      expect(categories).toEqual([
        'Frontend', 'Backend', 'Mobile', 'DevOps'
      ])
    });

    it('should render 4 job location links for browse jobs', () => {
      const jobCategoryLinks = wrapper.findAll('.browse-jobs.next-line .tag-header-tags')
      const categories = jobCategoryLinks.wrappers.map(link => {
        return link.text();
      });

      expect(jobCategoryLinks.length).toEqual(4);
      expect(categories).toEqual([
        'İstanbul', 'İzmir', 'Ankara', 'Remote'
      ])
    }),

      it('should render LocationSelect component', () => {
        expect(wrapper.find(LocationSelect).exists()).toEqual(true);
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
