'use strict';

(() => {
  const getRandomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  window.utils = {
    getRandomFrom,
  }
})();
