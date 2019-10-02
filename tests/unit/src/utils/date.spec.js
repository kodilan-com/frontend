import formatDate from '@/utils/date';

describe('date.js', () => {
  it('should return "bir dakikadan az bir süre önce", if given date is now', () => {
    expect(formatDate(new Date())).toBe('bir dakikadan az bir süre önce');
  });

  it('should return " 1 ay once", if given date is last month', () => {
    const now = new Date();

    now.setMonth(now.getMonth() - 1);

    expect(formatDate(now)).toBe(' 1 ay önce');
  });
});
