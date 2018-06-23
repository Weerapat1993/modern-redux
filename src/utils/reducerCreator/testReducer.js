import { reducerCreator } from './reducerCreator'
import { asyncActionType } from '../async-action-types'

const ACTION = asyncActionType('ACTION')

const initialState = {
  keys: {},
  byID: [],
  isFetching: false,
  isReload: true,
  error: '',
  code: 0,
}

const testReducer = (state = initialState, action) => {
  // Action Value
  const { type, data } = action
  // Reducer Creator
  const {
    setStateRequest,
    setStateSuccess,
    setStateFailure,
  } = reducerCreator(state, action)
  // Switch Case to Store
  switch (type) {
    case ACTION.REQUEST:
      return setStateRequest()
    case ACTION.SUCCESS:
      return setStateSuccess({ data })
    case ACTION.FAILURE:
      return setStateFailure()
    default:
      return state
  }
}
