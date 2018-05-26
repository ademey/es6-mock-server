import { isProvider } from '../util';

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
const shape = def => i =>
  // Create a new object with the same keys but new values
  Object.entries(def).reduce((acc, [ key, fn ]) => {
    // Is the value a function? If so call and assign value
    if (isProvider(fn)) {
      acc[key] = fn(i);
    }
    // Just return the value if not a function
    return acc;
  }, {});


export default shape;
