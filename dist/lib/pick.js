'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = undefined;

var _util = require('./util');

/**
 * Create a function that returns a random item from an array.
 * @type {ProviderCreator}
 * @param {array} list - Array to seed the provider
 * @return {function(): any}
 * @example
 * const randomFruit = pick(['Apple', 'Banana', 'Cherry']);
 * randomFruit() // 'Banana'
 * randomFruit() // 'Apple'
 */
var pick = exports.pick = function pick(list) {
  return function () {
    return (0, _util.getRandom)(list);
  };
};
//# sourceMappingURL=pick.js.map