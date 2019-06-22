import { shallowMount, createLocalVue } from '@vue/test-utils';
import ApplyLink from '@/components/shared/ApplyLink.vue';

describe('ApplyLink.vue', () => {
  const generateWrapper = (propsData = {}, computed) => {
    return shallowMount(ApplyLink, {
      propsData,
      computed,
      stubs: [
        'router-link'
      ]
    });
  }

  describe('computed', () => {
    describe('mailToUrl', () => {
      it('should return correct url', () => {
        const expected = 'mailto:Email?subject=Test%20Company%20Test%20Position%20%C4%B0lan%20Ba%C5%9Fvurusu&body=%0A%0A%0A%0A-%0Akodilan.com%20arac%C4%B1l%C4%B1%C4%9F%C4%B1yla%20g%C3%B6nderilmi%C5%9Ftir.';
        const wrapper = generateWrapper({
          post: {
            company: {
              name: 'Test Company'
            },
            apply_email: 'Email',
            position: 'Test Position'
          }
        });

        expect(wrapper.vm.mailToUrl).toEqual(expected);
      });
    })
  });

  describe('template', () => {
    it('should render email apply link, if apply_email is given in post props data', () => {
      const wrapper = generateWrapper(
        {
          post: {
            apply_email: 'dummy'
          }
        },
        { mailToUrl: () => 'test' }
      );

      expect(wrapper.find('a.tag-apply-link').exists()).toBe(true);
    });

    it('should not render email apply link, if apply_email is not given in post props data', () => {
      const wrapper = generateWrapper(
        {
          post: {}
        },
        { mailToUrl: () => 'test' }
      );

      expect(wrapper.find('a.tag-apply-link').exists()).toBe(false);
    });

    it('should render url apply link, if apply_url is given in post props data', () => {
      const wrapper = generateWrapper(
        {
          post: {
            apply_url: 'url'
          }
        },
        { mailToUrl: () => 'test' }
      );
      const aTag = wrapper.find('a.tag-apply-link');

      expect(aTag.exists()).toBe(true);
      expect(aTag.attributes('href')).toEqual('url');
    });

    it('should not render url apply link, if apply_url is not given in post props data', () => {
      const wrapper = generateWrapper(
        {
          post: {}
        },
        { mailToUrl: () => 'test' }
      );

      expect(wrapper.find('a.tag-apply-link').exists()).toBe(false);
      expect(wrapper.find('a .fa-link').exists()).toBe(false);
    });

    it('should render "Site üzerinden başvur" tag if apply_email and apply_url are given in post props data', () => {
      const wrapper = generateWrapper(
        {
          post: {
            apply_url: 'url',
            apply_email: 'email'
          }
        },
        { mailToUrl: () => 'test' }
      );
      const aTag = wrapper.findAll('a.tag-apply-link').at(1);

      expect(aTag.exists()).toBe(true);
      expect(aTag.attributes('href')).toEqual('url');
      expect(aTag.find('i.fa-link').exists()).toBe(true);
    });

    it('should not render "Site üzerinden başvur" tag if apply_url is given in post props data but apply_email is not', () => {
      const wrapper = generateWrapper(
        {
          post: {
            apply_url: 'url',
          }
        },
        { mailToUrl: () => 'test' }
      );
      const aTag = wrapper.find('a.tag-apply-link');

      expect(aTag.exists()).toBe(true);
      expect(aTag.attributes('href')).toEqual('url');
      expect(aTag.find('i.fa-link').exists()).toBe(false);
    });
  });
})
