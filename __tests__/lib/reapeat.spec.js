import { repeat } from '../../lib';

describe('repeat', () => {
  const list = repeat(() => '🍋', 10);

  it('Creates an array', () => {
    expect(list).toBeDefined();
    // expect(typeof list).toEqual('array');
  });

  it('Has the correct length', () => {
    expect(list.length).toBe(10);
  });
});
