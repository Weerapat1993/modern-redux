import { reducerCreator } from './reducerCreator'
import { asyncActionType } from '../async-action-types'

const ACTION_LIST = asyncActionType('ACTION_LIST')
const ACTION_DETAIL = asyncActionType('ACTION_DETAIL')
const ACTION_UPDATE = asyncActionType('ACTION_UPDATE')

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
    setStateWithKeyRequest,
    setStateWithKeySuccess,
    setStateWithKeyFailure,
    setStateRequest,
    setStateFailure,
    updateDataWithKeyRequest,
    updateDataWithKeySuccess,
    updateDataWithKeyFailure,
    normalizerList,
  } = reducerCreator(state, action)
  // Switch Case to Store
  switch (type) {
    case ACTION_LIST.REQUEST:
      return setStateRequest()
    case ACTION_LIST.SUCCESS:
      return normalizerList(data)
    case ACTION_LIST.FAILURE:
      return setStateFailure()
    case ACTION_DETAIL.REQUEST:
      return setStateWithKeyRequest()
    case ACTION_DETAIL.SUCCESS:
      return setStateWithKeySuccess({ data })
    case ACTION_DETAIL.FAILURE:
      return setStateWithKeyFailure()
    case ACTION_UPDATE.REQUEST:
      return updateDataWithKeyRequest()
    case ACTION_UPDATE.SUCCESS:
      return updateDataWithKeySuccess(data)
    case ACTION_UPDATE.FAILURE:
      return updateDataWithKeyFailure()
    default:
      return state
  }
}
