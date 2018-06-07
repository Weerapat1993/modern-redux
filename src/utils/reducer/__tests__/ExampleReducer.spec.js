import { ExampleReducer, exampleReducer } from '../ExampleReducer'

describe('Test', () => {
  const classReducer = (action, state) => new ExampleReducer({ action, state })._setInitial()
  it('Test InitialState', () => {
    const action = { type: 'ETC', key: 'ETC' }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).initialState
    expect(recieved).toEqual(expected)
  })

  it('Test SET_STATE', () => {
    const action = { type: 'SET_STATE', key: 'SET_STATE' }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).setState({ byID: ['HI'] })
    expect(recieved).toEqual(expected)
  })

  it('Test SET_STATE_WITH_KEY', () => {
    const action = { type: 'SET_STATE_WITH_KEY', key: 'SET_STATE_WITH_KEY' }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).setStateWithKey({ error: '' })
    expect(recieved).toEqual(expected)
  })

  it('Test Request', () => {
    const action = { type: 'REQUEST', key: 'REQUEST' }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).setStateWithKeyRequest()
    expect(recieved).toEqual(expected)
  })

  it('Test Success', () => {
    const data = { name: 'John' }
    const action = { type: 'SUCCESS', key: 'SUCCESS', data }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).setStateWithKeySuccess({ data })
    expect(recieved).toEqual(expected)
  })

  it('Test Failure', () => {
    const action = { type: 'FAILURE', key: 'FAILURE', error: new Error('Error') }
    const recieved = exampleReducer(undefined, action)
    const expected = classReducer(action).setStateWithKeyFailure()
    expect(recieved).toEqual(expected)
  })

  it('Test Update Key', () => {
    // First Data
    const action = { type: 'UPDATE_KEY', key: 'product1', data: { status: 'pending' } }
    const state = classReducer(action).setStateWithKeySuccess({ data: action.data })

    // Second Data
    const action2 = { type: 'UPDATE_KEY', key: 'product1', data: { status: 'processing' } }
    const recieved = exampleReducer(state, action2) 
    const expected = classReducer(action2, state).setStateWithKey({ 
      data: {
        ...classReducer(action2, state).getStateWithKey().data,
        ...action2.data
      }
    })
    expect(recieved).toEqual(expected)
  })

  it('Test Normalize Data', () => {
    // First Data
    const action = { type: 'NORMALIZE_DATA', data: [{ id: 'product1' }]}
    // Second Data
    const recieved = exampleReducer(undefined, action) 
    const reducer = classReducer(action)
    const expected = reducer.setState({ 
      keys: reducer.normalizeData(action.data)
    })
    expect(recieved).toEqual(expected)
  })
})
