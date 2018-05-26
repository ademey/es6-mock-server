import { tidy } from '../../lib/util';


describe('tidy', () => {
  it('Removes punctuation', () => {
    expect(tidy('Help?')).toEqual('Help');
    expect(tidy('One. Two! T:hree')).toEqual('One Two Three');
  });
});
