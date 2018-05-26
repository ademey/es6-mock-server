import { randomRange } from '../util';

/**
 * Return a random timestamp between `min` and `max` values.
 * @type {ProviderCreator}
 * @param {number} min - Min date
 * @param {number} max - Max date
 * @return {number} timestamp
 */
export const timestamp = (min = 0, max = Date.now()) => () => randomRange(min, max);
