import { pick, shape } from '../../lib/providers'

describe('array', () => {
  it('Returns a function to call', () => {
    const p = pick(['a', 'b', 'c'])
    expect(p()).toBeDefined()
  })
})

describe('shape', () => {
  it('Creates random data from shape', () => {
    const shopping = shape({
      fruit: pick(['apple', 'banana', 'cherry'])
    })
    const gen = shopping()
    expect(gen).toBeDefined()
    expect(gen.fruit).toBeDefined()
    expect(typeof gen.fruit).toEqual('string')
  })
})
