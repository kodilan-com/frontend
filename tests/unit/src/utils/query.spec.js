import query from '@/utils/query';

describe('query.js', () => {
  it('should return false if given object has not query and location and type property', () => {
    expect(query.getParams({})).toBe(false);
  });

  it('should return object with contains "query" in it, if given object has "query"', () => {
    expect(query.getParams({
      query: 'query',
    })).toEqual({
      query: 'query',
    });
  });

  it('should return object with contains "location" in it, if given object has "location"', () => {
    expect(query.getParams({
      location: 'location',
    })).toEqual({
      location: 'location',
    });
  });

  it('should return object with type "type" in it, if given object has parsable integer "type"', () => {
    expect(query.getParams({
      type: '1',
    })).toEqual({
      type: '1',
    });
  });

  it('should return object with type "type" in it, if given object has not parsable integer "type"', () => {
    expect(query.getParams({
      type: 'not_parsable',
    })).toEqual({});
  });
});
