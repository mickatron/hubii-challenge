/* eslint-disable */
// Setup Enzyme
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

// Fail tests on any warning
console.error = message => {
   // throw new Error(message);
};

// LOCAL STORAGE MOCK
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });