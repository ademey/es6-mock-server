import { getRandom } from './util';

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
export const pick = list => () => getRandom(list);
