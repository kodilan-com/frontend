import jobDetail from '@/mixins/jobDetail';
import formatDate from '@/utils/date';

jest.mock('@/utils/date');

describe('jobDetail.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should be required props "post"', () => {
    expect(jobDetail.props).toEqual({
      post: {
        type: Object,
        required: true,
      },
    });
  });

  describe('computed', () => {
    let computed;

    beforeEach(() => {
      computed = {
        post: {
          type: '2',
          company: 'test-company',
          slug: 'test-slug',
          updated_at: 'test-updated-at',
        },
        ...jobDetail.computed,
      };
    });

    it('should return correct details url', () => {
      expect(computed.detailsUrl()).toBe(`/ilanlar/${computed.post.slug}`);
    });

    it('should return correct company', () => {
      expect(computed.company()).toBe(computed.post.company);
    });

    it('should call formatDate function', () => {
      formatDate.mockReturnValue('test_date');

      expect(computed.timeago()).toBe('test_date');
      expect(formatDate).toHaveBeenCalledWith(computed.post.updated_at);
    });

    it('should return "Yarı zamanlı" as jobType', () => {
      expect(computed.jobType()).toBe('Yarı zamanlı');
    });

    it('should return "" string as jobType if post type is unknown', () => {
      computed.post.type = '111';

      expect(computed.jobType()).toBe('');
    });

    it('should return "part-time" class name', () => {
      expect(computed.postTypeClassName()).toEqual({
        'part-time': true,
      });
    });
  });
});
