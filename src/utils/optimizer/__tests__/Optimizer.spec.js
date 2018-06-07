import { Optimizer } from '../Optimizer'

describe('Optimizer.js', () => {
  it ('_removeFunction', () => {
    const data = {
      a: {},
      b: { id: 'Test' },
      c: [{ id: 'Test' }],
      func: () => null,
    }
    const recieved = Optimizer._removeFunction(data)
    const expected = {
      a: {},
      b: { id: 'Test' },
      c: [{ id: 'Test' }],
    }
    expect(recieved).toEqual(expected)
  });
  it ('_removeFunction when data is object function', () => {
    const data = {
      a: {},
      b: { id: 'Test' },
      actionCreator: {
        func: () => null,
        func2: () => null,
        action: {},
        arr: [{ id: 1234 }]
      }
    }
    const recieved = Optimizer._removeFunction(data)
    const expected = {
      a: {},
      b: { id: 'Test' },
      actionCreator: {
        action: {},
        arr: [{ id: 1234 }]
      },
    }
    expect(recieved).toEqual(expected)
  });
  it ('isShouldRender when data is equal', () => {
    const prevProps = {
      a: {},
      b: { id: 'Test' },
      func: () => null,
    }
    const nextProps = {
      a: {},
      b: { id: 'Test' },
      func: () => null,
      func2: (id) => 1234,
      func3: [() => null],
    }
    const recievedProps = Optimizer.isShouldRenderProps(prevProps, nextProps)
    const recievedState = Optimizer.isShouldRenderState(prevProps, nextProps)
    expect(recievedProps).toEqual(false)
    expect(recievedState).toEqual(false)
  });

  it ('isShouldRender when data is not equal', () => {
    const prevProps = {
      a: {},
      b: { id: 'Test' },
      func: () => null,
    }
    const nextProps = {
      a: {},
      b: { id: 'Test2' },
      func: () => null,
      func2: (id) => 1234,
      func3: [() => null],
    }
    const recievedProps = Optimizer.isShouldRenderProps(prevProps, nextProps)
    const recievedState = Optimizer.isShouldRenderState(prevProps, nextProps)
    expect(recievedProps).toEqual(false)
    expect(recievedState).toEqual(false)
  });
})