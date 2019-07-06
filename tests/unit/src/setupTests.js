Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    writable: true,
  },
});
