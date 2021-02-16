import { normalizeUrl } from '@/utils/url';

describe('utils/url', () => {
  it('should return empty string if url is falsy', () => {
    const result = normalizeUrl();

    expect(result).toBe('');
  });

  it('should return url directly if given url contains http keyword', () => {
    const url = 'http://test.com';
    const result = normalizeUrl(url);

    expect(result).toBe(url);
  });

  it('should return url with http:// prefix if given url does not contains http keyword', () => {
    const url = 'test.com';
    const result = normalizeUrl(url);

    expect(result).toBe(`http://${url}`);
  });
});
