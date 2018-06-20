import { repeat } from '../../lib'

describe('repeat', () => {
  const list = repeat(() => '🍋', 10)

  it('Creates an array', () => {
    expect(list).toBeDefined()
    // expect(typeof list).toEqual('array');
  })

  it('Has the correct length', () => {
    expect(list.length).toBe(10)
  })

  it('Calls provider with arguments', () => {
    const provider = jest.fn()
    expect(
      repeat(provider, 2).toHaveBeenCalledWith(undefined, 1, [
        undefined,
        undefined
      ])
    )
  })
})
