require('../../node_modules/awesomplete/awesomplete.min');
require('../../node_modules/awesomplete/awesomplete.css');

export default {
  init(inputEl, items) {
    return new window.Awesomplete(inputEl, {
      list: items,
      filter(text, input) {
        return window.Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      },
      item(text, input) {
        return window.Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      },
      replace() {
        return null;
      },
    });
  },
};
