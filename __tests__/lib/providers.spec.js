import { pick, shape, nonsense } from '../../lib/providers';

describe('array', () => {
  it('Returns a function to call', () => {
    const p = pick(['a', 'b', 'c']);
    expect(p()).toBeDefined();
  });
});

describe('shape', () => {
  it('Creates random data from shape', () => {
    const shopping = shape({
      fruit: pick(['apple', 'banana', 'cherry'])
    });
    const gen = shopping();
    expect(gen).toBeDefined();
    expect(gen.fruit).toBeDefined();
    expect(typeof gen.fruit).toEqual('string');
  });
});

describe('nonsense', () => {
  it('Returns something', () => {
    const str = nonsense(5)();
    expect(str).toBeDefined();
    expect(typeof str).toEqual('string');
    expect(str.length).toBe(5);
  });
});

