import { shallowMount } from '@vue/test-utils';
import AppFooter from '@/components/shared/AppFooter';

describe('AppFooter.vue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('data', () => {
    it('should have "isBackToTopVisible" as false value', () => {
      const componentState = AppFooter.data();

      expect(componentState.isBackToTopVisible).toEqual(false);
    });

    it('should have "isFooterSubscribeVisible" as true value if "subscribeClosed" value is false', () => {
      const componentState = AppFooter.data();

      expect(componentState.isFooterSubscribeVisible).toEqual(true);
    });

    it('should have "isFooterSubscribeVisible" as true value if "subscribeClosed" value is false', () => {
      localStorage.getItem.mockReturnValue(false);

      const componentState = AppFooter.data();

      expect(componentState.isFooterSubscribeVisible).toEqual(true);
    });

    it('should have "isFooterSubscribeVisible" as false value if "subscribeClosed" value is true', () => {
      localStorage.getItem.mockReturnValue(true);

      const componentState = AppFooter.data();

      expect(componentState.isFooterSubscribeVisible).toEqual(false);
    });
  });

  describe('methods', () => {
    describe('handleScroll', () => {
      const setScrollY = (value) => {
        Object.defineProperty(window, 'scrollY', {
          value,
          writable: true,
        });
      };

      it('assign "isBackToTopVisible" to true, if scrollY is greater than 540', () => {
        const wrapper = shallowMount(AppFooter, {
          stubs: ['router-link'],
        });

        setScrollY(541);

        wrapper.vm.handleScroll();

        expect(wrapper.vm.isBackToTopVisible).toEqual(true);
      });

      it('assign "isBackToTopVisible" to false, if scrollY is smaller than 540', () => {
        const wrapper = shallowMount(AppFooter, {
          stubs: ['router-link'],
        });

        setScrollY(539);

        wrapper.vm.handleScroll();

        expect(wrapper.vm.isBackToTopVisible).toEqual(false);
      });

      it('assign "isBackToTopVisible" to false, if scrollY is equal than 540', () => {
        const wrapper = shallowMount(AppFooter, {
          stubs: ['router-link'],
        });

        setScrollY(540);

        wrapper.vm.handleScroll();

        expect(wrapper.vm.isBackToTopVisible).toEqual(false);
      });
    });
  });

  describe('templates', () => {
    let wrapper;

    const generateWrapper = () => {
      wrapper = shallowMount(AppFooter, {
        stubs: ['router-link'],
      });
    };

    afterEach(() => {
      wrapper.destroy();
    });

    it('should match the snapshot', () => {
      generateWrapper();

      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('should not render .has-widget div which its id is #footer, if subscribeClosed is true', () => {
      localStorage.getItem.mockReturnValue(true);

      generateWrapper();
      const footer = wrapper.find('#footer');

      expect(footer.classes('has-widget')).toBe(false);
    });

    it('should render .has-widget div which its id is #footer, if subscribeClosed is false', () => {
      localStorage.getItem.mockReturnValue(false);

      generateWrapper();
      const footer = wrapper.find('#footer');

      expect(footer.classes('has-widget')).toBe(true);
    });

    it('should show "backtotop" div, if isBackToTopVisible is true', () => {
      generateWrapper();

      wrapper.setData({ isBackToTopVisible: true });

      expect(wrapper.find('#backtotop').exists()).toBe(true);
    });

    it('should not show "backtotop" div, if isBackToTopVisible is false', () => {
      generateWrapper();

      wrapper.setData({ isBackToTopVisible: false });

      expect(wrapper.find('#backtotop').exists()).toBe(false);
    });
  });
});
