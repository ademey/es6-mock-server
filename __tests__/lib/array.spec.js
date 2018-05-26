import { getRandom } from '../../lib/util';

describe('getRandom', () => {
  const list = ['a', 'b', 'c', 'd'];
  it('picks one', () => {
    const pick = getRandom(list);
    expect(list.indexOf(pick)).toBeGreaterThan(-1);
  });
});
