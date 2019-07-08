Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    writable: true,
  },
});

global.helper = {
  scrollY(value) {
    this.scroll('scrollY', value);
  },

  scroll(direction, value) {
    Object.defineProperty(window, direction, {
      value,
      writable: true,
    });
  },
};
