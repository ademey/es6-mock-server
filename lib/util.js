export const isProvider = provider => {
  if (typeof provider === 'function') {
    return true;
  }
  return false;
};

export const warnProvider = provider => {
  if (!isProvider(provider)) {
    throw new Error(`Provider must be a function. Recieved: ${provider}`);
  }
  return true;
};

/**
 * Create a whole number between the `min` and `max` values
 * @param {number} min - Lowest number
 * @param {number} max - Highest number
 * @return {number}
 * @todo Can't recall if this would include the min & max
 */
export const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Create a whole number between the `min` and `max` values. Very similar to randomRange(),
 * though this will return `min` if it is the only argument. This is mostly used to extract
 * the if/else logic from providers.
 *
 * Most providers have a signature of `fn(min :number, [max] :number)`. where given
 * one value they always return that number. But providing 2 values, `min` & `max`,
 * will generate random a value between that range.
 * @param {number} min - Lowest number
 * @param {number} max - Highest number
 * @return {number}
 */
export const makeNumber = (min, max) => (!max ? min : randomRange(min, max));

/**
 * Pick a random item from an array.
 * @param {array} arr - Array to pick a value from
 * @return {any} Single value from array
 */
export const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * @todo temp? document?
 * @param {string} str - String to clean up
 * @return {string}
 */
export const tidy = str => str.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ');
