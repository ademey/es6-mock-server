import { compose, map } from 'lodash/fp';
import { randomRange, makeNumber } from './util';

/**
 * Utilize the Array constructor to make an Array of empty values at a random
 * length. This can be used to then map over.
 *
 * ## Composition
 * `compose` will create a function that can take any number of arguments. Those arguments
 * will be passed first to `makeNumber`, which accepts 1 or 2 values. So `randomArray` can
 * accept 1 or 2 values.
 *
 * Calling `makeNumber` will create a single integer (which may be random, see `makeNumber` docs).
 * That integer is then passed to Array(int).
 *
 * Without using `compose` this function could look like:
 * const randomArray = (min, max) => Array(makeNumber(min, max));
 *
 * @example
 * // Empty array between 1 and 3
 * randomArray(1, 3) // [undefined, undefined]
 * // Empty array of length 2
 * randomArray(2) // [undefined, undefined]
 */
export const randomArray = compose(Array, makeNumber);

/**
 * Function to generate an array of data. The `provider` argument is a function that when called,
 * returns any data. This function will then be called the number of times `count` is.
 *
 * The intention is that `provider` will return random data in order to create arrays of
 * unique values.
 *
 * ## Composition
 * @todo composition explaniation
 * @type {Repeater}
 * @param {function} provider - A function to call to create data. Will be called number of times
 *                             count is. The resulting value is added to the final array.
 * @param {number} min - Minimum number of items in the final array.
 * @param {number} [max] - Maximum number of items in the array.
 * @return {array}
 * @example <caption>The Provider function</caption>
 * // The function should return something random,
 * // this isn't helpful.
 * const notHelpfulProvider = () => ':(';
 * repeat(notHelpfulProvider, 3) // [':(', ':(', ':(']
 *
 * // Helpful provider returns unique values
 * const randomProvider = () => Math.round(Math.random() * 100)
 * repeat(randomProvider, 5) // [23, 56, 98, 12, 56]
 *
 */
export const repeat = (provider, min, max) => compose(map(provider), randomArray)(min, max);

/**
 * Create an array of random data, but ensure that each value in the array is unique.
 *
 * It is possible that this function returns less data than asked for by `count`. An internal
 * check will cancel the creation loop if it takes too many tries to create unique random data.
 * @type {Reapeater}
 * @param {function} provider - A function to call to create data. Will be called number of times
 *                             count is. The resulting value is added to the final array.
 * @param {number} min - Minimum number of items in the final array.
 * @param {number} [max] - Maximum number of items in the array.
 * @return {array}
 * // Pick a random letter from the alphabet each time called
 * const abcProvider = arrayProvider(['A', 'B', 'C'...]);
 * abcProvider() // 'K'
 *
 * // repeat function may duplicated items
 * repeat(abcProvider, 5) // ['C', 'L', 'R', 'Q', 'R']
 * // unique will keep calling the provider until it creates the requested number of items...
 * unique(abcProvider, 5) // ['X', 'Q', 'G', 'P', 'T']
 *
 * // Unless you try to create a lot of data from a small source set.
 * // This will not likely create 20 letters randomly that are unique.
 * // This loop will exit before it reaches 20
 * unique(abcProvider, 20) // An array with less than 20 values
 */
export const unique = (provider, min, max) => {
  const count = max ? randomRange(min, max) : min;
  if (typeof provider() === 'object') {
    console.warn('unique doesnt support objects at this time');
    return repeat(provider, count);
  }
  const uniqueMap = {};
  let attempts = 0;
  for (let i = 0; i < count; i++) {
    // Create the item
    const val = provider();
    // Check if item exists in the uniqueMap. If it does decrement this
    // loop to create an item again.
    if (uniqueMap[val]) i--;

    // Since the loop can decrement if a duplicate is created, keep track of
    // how many times it actually ran so far.
    attempts++;
    // Don't let this loop forever. If this has been trying to create unique values and cant
    // after 2x the list length, exit loop and return less items
    if (attempts > count * 2) break;

    // Assign created value as key and value in uniqueMap
    map[val] = val;
  }
  // Create an array out of uniqueMap
  return Object.values(uniqueMap);
};
