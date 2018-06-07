import _ from 'lodash'

export const classReducer = ClassReducer => (state, action) => new ClassReducer({ state, action })._setInitial().getState()

/**
 * @typedef {Object} State data in initalState
 * @property {Object} [keys] data object with key
 * @property {Array.<string>} [byID] data key list
 */

/**
 * @typedef {Object} StateWithKey data state in each key
 * @property {boolean} [isFetching] check data when loading
 * @property {boolean} [isReload] check data when reload again
 * @property {string} [error] error message response
 * @property {any} [data] data inforamtion
 */

/**
  * @typedef {Object} Action
  * @property {string} type action type name
  * @property {any} [data] data response from API
  * @property {string} [key] data key when find key object in reducer
  * @property {Error} [error] error response from API
  */

/**
 * @typedef {Object} PropReducer
 * @property {State} state state in store from redux
 * @property {Action} action action from action creator
 */

/**
 * @global
 */
export class BaseReducer {
  /**
   * get Class Name
   * @private
   * @return {string}
   */
  static _getName() {
    return this.toString().split(' ')[1].split('(')[0]
  }

  /**
   * Reducer Constructor
   * @constructor
   * @param {PropReducer} props Properties in Reducer
   */
  constructor(props) {
    this.initialState = {}
    /** @type {State} */
    this.state = props.state
    /** @type {Action} */
    this.action = props.action
    /** @type {string} */
    this.key = props.action.key
  }

  /** @private */
  _setInitial() {
    if (!this.state) {
      this.state = this.initialState
    }
    return this
  }

  /** @private */
  _getKeyWarning() {
    if (!this.key) console.warn(`Reducer: action.key is 'undefined' in ${this.constructor._getName()}`)
  }

  /**
   * Get Error Message
   * @return {String} response error message is string
   */
  errorMessage() {
    const { error } = this.action
    return _.get(error, 'response.data.message') || error.message
  }

  /**
   * Set State
   * @param {StateWithKey} newState create new state
   * @return {State} get new state
   */
  setState(newState) {
    return {
      ...this.state,
      ...newState,
    }
  }

  /**
   * Set state withKey in Reducer
   * @param {StateWithKey} newState create new state in key object
   * @return {State} get new state in key object
   */
  setStateWithKey(newState) {
    this._getKeyWarning()
    return {
      ...this.state,
      keys: {
        ...this.state.keys,
        [this.key]: {
          ...this.state.keys[this.key],
          ...newState,
        },
      },
    }
  }

  /**
   * Get state withKey in Reducer
   * @return {StateWithKey} getState in key object
   */
  getStateWithKey() {
    this._getKeyWarning()
    return this.state.keys[this.key]
  }

  /**
   * Get state in Reducer
   * @return {State} get state in reducer
   */
  getState() {
    return this.state
  }
}
