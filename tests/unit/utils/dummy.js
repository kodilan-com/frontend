const letters = ['a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];

const string = (length = 10) => [...Array(length).keys()].map(i => letters[i % letters.length]).join('');

export default {
  string,
};
