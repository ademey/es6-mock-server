import { words } from '../../lib/providers';

describe('words', () => {
  it('Provides a fixed number of words', () => {
    const threeWords = words(3)();
    expect(typeof threeWords).toEqual('string');
  });
});
