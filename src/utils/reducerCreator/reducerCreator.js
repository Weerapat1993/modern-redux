import _ from 'lodash'
import R from 'ramda'

const defaultInitialState = {
  keys: {},
  byID: [],
  isFetching: false,
  isReload: true,
  isDeleting: false,
  error: '',
  errorDelete: '',
  code: 0,
}

/**
 * Default Initial State
 * @param {Object} newState set initial state
 * @return {State}
 * @example
 * export const initialState = defaultState({ ...state })
 */
export const defaultState = newState => ({
  ...defaultInitialState,
  ...newState,
})

/**
 * @typedef {defaultInitialState} State
 *
 * @typedef {Object} Action
 * @property {String} type
 * @property {String} [key]
 * @property {Object|Array} [data]
 * @property {Error} error
 *
 * @typedef {Object} StateWithKey
 * @property {boolean} isFetching check data when loading
 * @property {boolean} isEditing check data when update
 * @property {boolean} isReload check data when reload again
 * @property {string} error error message response
 * @property {string} error error message response when update
 * @property {Object|Array} data data inforamtion
 */

/**
 * Reducer Creator
 * @param {State} state state in store from redux
 * @param {Action} action action action from action creator
 * @param {string} keyID key of item ID
 */
export const reducerCreator = (state, action, keyID) => {
  const key = keyID || action.key

  // ! Private ----------------------------------------

  /**
   * Fillable Normalize Data
   * @private
   * @param {any} item data when you need normalize data
   * @return {StateWithKey}
   * @example
   */
  const _fillable = item => ({
    isFetching: false,
    isEditing: false,
    isReload: false,
    error: '',
    errorUpdate: '',
    data: item,
  })

  /**
   * Convert Array To Object with key
   * @private
   * @param {Array.<Object>} array array data required normalize
   * @param {string} primaryKey primaray key in array
   * @return {Fillable}
   */
  const _normalizeData = (array, primaryKey = 'id') => {
    const newData = {}
    array.forEach((item) => {
      newData[item[primaryKey]] = _fillable(item)
    })
    return newData
  }

  // * Public -----------------------------------------

  /**
   * Set State
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const setState = newState => ({
    ...state,
    newState,
  })

  /**
   * Set state withKey in Reducer
   * @param {StateWithKey} newState create new state in key object
   * @return {State} get new state in key object
   */
  const setStateWithKey = newState => ({
    ...state,
    keys: {
      ...state.keys,
      [key]: {
        ...state.keys[key],
        ...newState,
      },
    },
  })

  /**
   * Get Error Message
   * @return {String} response error message is string
   */
  const errorMessage = () => {
    const { error } = action
    return _.get(error, 'response.data.message') || error.message
  }

  /**
   * Get state withKey in Reducer
   * @return {StateWithKey} getState in key object
   */
  const getStateWithKey = () => state.keys[key]

  /**
   * Normalizer List
   * @param {Array<Object>} data
   * @param {string} primaryKey
   * @return {State}
   */
  const normalizerList = (data, primaryKey = 'id') => ({
    isFetching: false,
    isReload: false,
    error: '',
    keys: {
      ...state.keys,
      ..._normalizeData(data),
    },
    byID: R.uniq([
      ...data.map(item => item[primaryKey]),
      ...state.byID,
    ]),
  })

  /**
   * setState with Key case request
   * @param {StateWithKey} [newState] craete new state
   * @return {State}
   */
  const setStateWithKeyRequest = newState => setStateWithKey({
    isFetching: true,
    isReload: false,
    error: '',
    ...newState,
  })

  /**
   * setState with Key case success
   * @param {StateWithKey} newState craete new state
   * @return {State} new state data
   */
  const setStateWithKeySuccess = newState => setStateWithKey({
    isFetching: false,
    isReload: false,
    error: '',
    ...newState,
  })

  /**
   * setState with Key case failure
   * @param {StateWithKey} [newState] craete new state
   * @return {State} new state data
   */
  const setStateWithKeyFailure = newState => setStateWithKey({
    isFetching: false,
    isReload: false,
    error: errorMessage(),
    ...newState,
  })

  /**
   * Set State case request
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const setStateRequest = newState => ({
    ...state,
    isFetching: true,
    isReload: false,
    error: '',
    ...newState,
  })

  /**
   * Set State case success
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const setStateSuccess = newState => ({
    ...state,
    isFetching: false,
    isReload: false,
    error: '',
    ...newState,
  })

  /**
   * Set State case failure
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const setStateFailure = newState => ({
    ...state,
    isFetching: false,
    isReload: false,
    error: errorMessage(),
    ...newState,
  })

  /**
   * Update data with key case request
   * @param {StateWithKey} newState create new state
   * @return {State} get new state
   */
  const updateDataWithKeyRequest = newState => setStateWithKey({
    isEditing: true,
    errorUpdate: '',
    ...newState,
  })

  /**
   * Update data with key case success
   * @param {Object} data data update with key
   * @param {StateWithKey} newState create new state
   * @return {State} get new state
   */
  const updateDataWithKeySuccess = (data, newState) => setStateWithKey({
    isEditing: false,
    errorUpdate: '',
    data: {
      ...getStateWithKey().data,
      ...data,
    },
    ...newState,
  })

  /**
   * Update data with key case failure
   * @param {StateWithKey} newState create new state
   * @return {State} get new state
   */
  const updateDataWithKeyFailure = newState => setStateWithKey({
    isEditing: false,
    errorUpdate: errorMessage(),
    ...newState,
  })

  /**
   * Delete key in byID case request
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const deleteDataRequest = newState => setState({
    isDeleting: true,
    errorDelete: '',
    ...newState,
  })

  /**
   * Delete key in byID case success
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const deleteDataSuccess = newState => setState({
    isDeleting: false,
    errorDelete: '',
    byID: state.byID.filter(item => item !== key),
    ...newState,
  })

  /**
   * Delete key in byID case failure
   * @param {State} newState create new state
   * @return {State} get new state
   */
  const deleteDataFailure = newState => setState({
    isDeleting: false,
    errorDelete: errorMessage(),
    ...newState,
  })

  return {
    setState,
    setStateWithKey,
    errorMessage,
    getStateWithKey,
    normalizerList,
    setStateRequest,
    setStateSuccess,
    setStateFailure,
    setStateWithKeyRequest,
    setStateWithKeySuccess,
    setStateWithKeyFailure,
    fetchList: {
      request: setStateRequest,
      success: normalizerList,
      failure: setStateFailure,
    },
    fetchDataWithKey: {
      request: setStateWithKeyRequest,
      success: setStateWithKeySuccess,
      failure: setStateWithKeyFailure,
    },
    updateDataWithKey: {
      request: updateDataWithKeyRequest,
      success: updateDataWithKeySuccess,
      failure: updateDataWithKeyFailure,
    },
    deleteKey: {
      request: deleteDataRequest,
      success: deleteDataSuccess,
      failure: deleteDataFailure,
    },
  }
}
