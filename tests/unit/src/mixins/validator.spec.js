import validator from '@/mixins/validator';

describe('validator mixin', () => {
  const mixinGenerator = objectValues => ({
    ...validator,
    ...objectValues,
  });

  describe('data', () => {
    it('should return default values', () => {
      const data = validator.data();

      expect(data)
        .toEqual({
          isDirty: false,
          validationErrorMessages: {},
        });
    });
  });

  describe('created hook', () => {
    it('should not set any object to schema variable if rules and formData is falsy', () => {
      const mixin = mixinGenerator({ schema: null });

      mixin.created();

      expect(mixin.schema)
        .toEqual(null);
    });

    it('should set Schema object to schema variable if rules and formData is true', () => {
      const mixin = mixinGenerator({
        schema: null,
        rules: {},
        formData: {},
      });

      mixin.created();

      expect(mixin.schema)
        .not.toEqual(null);
    });
  });

  describe('methods/validateForm', () => {
    it('should set FALSE to isDirty if there is no error in form data', (done) => {
      const object = {
        formData: { data: 'test' },
        schema: {
          validate: jest.fn((formData, callback) => callback()),
        },
      };
      const mixin = {
        ...mixinGenerator(object),
        ...mixinGenerator(object).methods,
      };

      mixin.validateForm();

      setTimeout(() => {
        expect(mixin.isDirty)
          .toBe(false);
        expect(mixin.validationErrorMessages)
          .toEqual({});

        done();
      });
    });

    it('should set TRUE to isDirty if there is no error in form data', (done) => {
      const errors = [{
        message: 'testError',
        field: 'testField',
      }];
      const object = {
        formData: { data: 'test' },
        schema: {
          validate: jest.fn((formData, callback) => callback(errors)),
        },
      };
      const mixin = {
        ...mixinGenerator(object),
        ...mixinGenerator(object).methods,
      };

      mixin.validateForm();

      setTimeout(() => {
        expect(mixin.isDirty)
          .toBe(true);
        expect(mixin.validationErrorMessages)
          .toEqual({ testField: 'testError' });

        done();
      });
    });
  });
});
