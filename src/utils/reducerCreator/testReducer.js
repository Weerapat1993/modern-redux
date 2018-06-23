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
  const {
    setStateWithKey,
    errorMessage,
  } = reducerCreator(state, action)
  switch (action.type) {
    case ACTION.REQUEST:
      return setStateWithKey({
        isFetching: true,
        isReload: false,
        error: '',
        code: 0,
      })
    case ACTION.SUCCESS:
      return setStateWithKey({
        isFetching: false,
        isReload: false,
        error: '',
        code: action.code,
      })
    case ACTION.FAILURE:
      return setStateWithKey({
        isFetching: false,
        isReload: false,
        error: errorMessage(),
        code: action.code,
      })
    default:
      return state
  }
}
