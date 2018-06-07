import R from 'ramda'
import { BaseReducer } from './BaseReducer'

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
 * @typedef {Object} Fillable
 * @property {boolean} isFetching check data when loading
 * @property {boolean} isReload check data when reload again
 * @property {string} error error message response
 * @property {any} data data inforamtion
 */

/**
 * @class Reducer
 * @extends BaseReducer
 * @example
 * // productReducer.js
 * import { Reducer, classReducer } from '../utils'
 * 
 * export class ProductReducer extends Reducer {
 *   // InitialState Product List & Detail
 *   initialState = {
 *     keys: {},
 *     byID: [],
 *     isFetching: false,
 *     isReload: true,
 *     error: '',
 *   }
 * 
 *   getState() {
 *     const { type, data } = this.action
 *     switch(type) {
 *       case 'FETCH_PRODUCT_LIST.REQUEST':
 *         return this.setState({ 
 *           isFetching: true,
 *           isReload: false,
 *           error: '',
 *         })
 *       case 'FETCH_PRODUCT_LIST.SUCCESS':
 *         return this.setState({ 
 *           keys: this.normailzeData(data),
 *           byID: data.map(item => item.id),
 *           isFetching: false,
 *           isReload: false,
 *           error: '',
 *         })
 *       case 'FETCH_PRODUCT_LIST.FAILURE':
 *         return this.setState({ 
 *           isFetching: false,
 *           isReload: false,
 *           error: this.errorMessage(),
 *         })
 *       default:
 *         return this.state
 *     }
 *   }
 * }
 * 
 * export const productReducer = classReducer(ProductReducer)
 */
export class Reducer extends BaseReducer {
  /**
   * Fillable Normalize Data
   * @param {any} item data when you need normalize data
   * @return {Fillable}
   * @example
   * // Fillable Default Data
   * {
   *   isFetching: false,
   *   isReload: true,
   *   error: '',
   *   data: item,
   * }
   */
  fillable = (item) => ({
    isFetching: false,
    isReload: false,
    error: '',
    data: item,
  })

  /**
   * Convert Array To Object with key
   * @param {Array.<Object>} array array data required normalize
   * @param {string} primaryKey primaray key in array
   * @return {Fillable}
   * @example
   * class ProductReducer extends Reducer {
   *   ...
   *   getState() {
   *     const { type, data } = this.action
   *     switch(type) {
   *       ...
   *       case FETCH_PRODUCT_LIST.SUCCESS:
   *         return this.setState({ 
   *           keys: this.normalizeData(data),
   *           byID: data.map(item => item.id),
   *         })
   *     }
   *   }
   * }
   * 
   */
  normalizeData(array, primaryKey = 'id') {
    const newData = {}
    array.forEach((item) => {
      newData[item[primaryKey]] = this.fillable(item)
    })
    return newData
  }

  /**
   * setState with Key case request
   * @param {StateWithKey} [newState] craete new state
   * @return {State}
   * @example
   * class ProductReducer extends Reducer {
   *   ...
   *   getState() {
   *     const { type } = this.action
   *     switch(type) {
   *       ...
   *       case FETCH_PRODUCT_BY_ID.REQUEST:
   *         return this.setStateWithKeyRequest()
   *     }
   *   }
   * }
   */
  setStateWithKeyRequest(newState) {
    return this.setStateWithKey({
      isFetching: true, 
      isReload: false, 
      error: '', 
      ...newState,
    })
  }

  /**
   * setState with Key case success
   * @param {StateWithKey} newState craete new state
   * @return {State} new state data
   * @example
   * class ProductReducer extends Reducer {
   *   ...
   *   getState() {
   *     const { type, data } = this.action
   *     switch(type) {
   *       ...
   *       case FETCH_PRODUCT_BY_ID.SUCCESS:
   *         return this.setStateWithKeySuccess({ data })
   *     }
   *   }
   * }
   */
  setStateWithKeySuccess(newState) {
    return this.setStateWithKey({ 
      isFetching: false, 
      isReload: false, 
      error: '', 
      ...newState,
    })
  }

  /**
   * setState with Key case failure
   * @param {StateWithKey} [newState] craete new state
   * @return {State} new state data
   * @example
   * class ProductReducer extends Reducer {
   *   ...
   *   getState() {
   *     const { type } = this.action
   *     switch(type) {
   *       ...
   *       case FETCH_PRODUCT_BY_ID.FAILURE:
   *         return this.setStateWithKeyFailure()
   *     }
   *   }
   * }
   */
  setStateWithKeyFailure(newState) {
    return this.setStateWithKey({ 
      isFetching: false, 
      isReload: false, 
      error: this.errorMessage(),
      ...newState,
    })
  }

  setStateRequest(newState) {
    return this.setState({ 
      isFetching: true, 
      isReload: false, 
      error: '',
      ...newState,
    })
  }

  setStateSuccess(newState) {
    return this.setState({ 
      isFetching: false, 
      isReload: false, 
      error: '',
      ...newState,
    })
  }

  setStateFailure(newState) {
    return this.setState({ 
      isFetching: false, 
      isReload: false, 
      error: this.errorMessage(),
      ...newState,
    })
  }

  /**
   * Normalizer List
   * @param {Array<Object>} data 
   * @param {string} primaryKey
   * @return {State}
   */
  normalizerList(data, primaryKey = 'id') {
    return this.setStateSuccess({ 
      keys: {
        ...this.state.keys,
        ...this.normalizeData(data)
      },
      byID: R.uniq([
        ...data.map(item => item[primaryKey]),
        ...this.state.byID,
      ]),
    })
  }
}

