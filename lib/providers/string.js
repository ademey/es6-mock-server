import { repeat } from '../';
import { pick } from '../providers';
import { randomRange, makeNumber, tidy } from '../util';
import lorem from '../../data/lorem.json';

const numSet = '0123456789'.split('');
const alphaSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alphaNumSet = [...numSet, ...alphaSet];

/**
 * Function get a random word of lorem ipsum.
 * @return {string}
 */
const loremProvider = pick(tidy(lorem).split(' '));


/**
 * Create a string from an array of data.
 * @param {string[]} set - Array of string to pick random values from.
 * @param {number} min - How long the string should be.
 * @param {number} max - tbd
 * @return {string}
 */
const stringFromSet = (set, min, max) => repeat(pick(set), makeNumber(min, max)).join('');

/**
 * Use a long string to pick a random section from, and return
 * a section of `length`
 * @param {string} source - String to pick random values from.
 * @param {number} length - How long the string should be.
 * @return {string} substring of source string
 */
const stringSlice = (source, length) => {
  // type check?
  if (source.length <= length) return source;

  const randomStartIndex = randomRange(0, source.length - length);
  return source.slice(randomStartIndex, randomStartIndex + length);
};

/**
 * Create a function that returns a random sting of letters, where
 * the length is `min`, or if `max`, return a string random size between those values.
 * @type {ProviderCreator}
 * @param {number} min - Minimum string length
 * @param {number} max - Max string length
 * @return {string}
 */
export const letters = (min, max) => () => stringFromSet(alphaSet, min, max);


/**
 * Create a function that returns a random sting of numbers, where
 * the length is `min`, or if `max`, return a string random size between those values.
 * @type {ProviderCreator}
 * @param {number} min - Minimum string length
 * @param {number} max - Max string length
 * @return {string}
 * @example
 * numbers(4)() // '1202'
 * numbers(4)() // '0013'
 * // Prove a `max` value for a range
 * numbers(2, 6)() // '312'
 * numbers(2. 6)() // '23463'
 */
export const numbers = (min, max) => () => stringFromSet(numSet, min, max);

/**
 * Create a function that returns a random sting of letters & numbers, where
 * the length is `min`, or if `max`, return a string random size between those values.
 * @type {ProviderCreator}
 * @param {number} min - Minimum string length
 * @param {number} max - Max string length
 * @return {string}
 */
export const code = (min, max) => () => stringFromSet(alphaNumSet, min, max);

/**
 * Create words of Lorem Ipsum
 * @type {ProviderCreator}
 * @param {number} min - Minimum number of words
 * @param {number} max - Maximum number of words
 * @return {string}
 */
export const words = (min, max) => () => repeat(loremProvider, min, max).join(' ');

/**
 * Create a string from Lorem Ipsum text provided by a JSON file. Picks a random section.
 * @deprecated Remove in favor of words()
 * @type {ProviderCreator}
 * @param {number} min - Minimum string length
 * @param {number} max - Max string length
 * @return {string}
 */
export const nonsense = (min, max) => () => stringSlice(lorem, min, max);
