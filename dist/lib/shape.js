'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shape = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = require('./util');

/**
 * Create a function that will return an object. The values of that object are also called if
 * they are a function.
 * @type {ProviderCreator}
 * @param {object} def - Shape definition to repeat
 * @return {function(): object}
 * @example
 * const theSame = shape({ a: '1', b: '2' });
 * theSame() // { a: '1', b: '2' }
 * theSame() // { a: '1', b: '2' }
 *
 * // Use functions to create random data
 * const diff = shape({ a: () => Math.random(), b: '2' })
 * diff() // { a: 0.2, b: '2' }
 * diff() // { a: 0.04, b: '2' }
 */
var shape = exports.shape = function shape(def) {
  return function (i) {
    return (
      // Create a new object with the same keys but new values
      Object.entries(def).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            fn = _ref2[1];

        // Is the value a function? If so call and assign value
        if ((0, _util.isProvider)(fn)) {
          acc[key] = fn(i);
        } else {
          // Return the original value if not a provider fn
          acc[key] = fn;
        }
        return acc;
      }, {})
    );
  };
};
//# sourceMappingURL=shape.js.map