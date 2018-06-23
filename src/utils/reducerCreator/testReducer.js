import { reducerCreator } from './reducerCreator'
import { asyncActionType } from '../async-action-types'

const ACTION_LIST = asyncActionType('ACTION_LIST')
const ACTION_DETAIL = asyncActionType('ACTION_DETAIL')
const ACTION_UPDATE = asyncActionType('ACTION_UPDATE')
const ACTION_DELETE = asyncActionType('ACTION_DELETE')

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
    fetchList,
    fetchDataWithKey,
    updateDataWithKey,
    deleteKey,
  } = reducerCreator(state, action)
  // Switch Case to Store
  switch (type) {
    case ACTION_LIST.REQUEST:
      return fetchList.request()
    case ACTION_LIST.SUCCESS:
      return fetchList.success(data)
    case ACTION_LIST.FAILURE:
      return fetchList.failure()
    case ACTION_DETAIL.REQUEST:
      return fetchDataWithKey.request()
    case ACTION_DETAIL.SUCCESS:
      return fetchDataWithKey.success({ data })
    case ACTION_DETAIL.FAILURE:
      return fetchDataWithKey.failure()
    case ACTION_UPDATE.REQUEST:
      return updateDataWithKey.request()
    case ACTION_UPDATE.SUCCESS:
      return updateDataWithKey.success(data)
    case ACTION_UPDATE.FAILURE:
      return updateDataWithKey.failure()
    case ACTION_DELETE.REQUEST:
      return deleteKey.request()
    case ACTION_DELETE.SUCCESS:
      return deleteKey.success()
    case ACTION_DELETE.FAILURE:
      return deleteKey.failure()
    default:
      return state
  }
}
