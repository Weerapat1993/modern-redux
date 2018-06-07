import { get } from 'lodash'
import PropTypes from 'prop-types'

/**
 * @class Model
 */
export class Model {
  /** set isRequired in PropTypes [Default: true]
   * @type {Object}
   * @example
   * static isRequired = {
   *   description: false
   * }
   * 
   * // { description: PropTypes.string }
   */
  static isRequired = {}

   /**
   * get Class Name
   * @private
   * @return {string}
   */
  static _getName() {
    return this.toString().split(' ')[1].split('(')[0]
  }

  /**
   * Data Model
   * @private
   * @param {Object} data data response from API
   * @param {string} key data key name
   * @param {any} defaultProps set defaultProps
   * @param {boolean} [isRequired] check required
   * @param {string} [dataType] check data type
   * @return {any}
   */
  static _model(data, key, defaultProps, isRequired = true, dataType) {
    if(data !== undefined && isRequired) {
      if(Object.keys(data).length) {
        if(get(data, key) === undefined) {
          console.warn(`Warning: API response to Model ${this.table || this._getName()}.${key} is not found.`)
        } else if(typeof get(data, key) !== dataType && dataType) {
          console.warn(`Warning: API response to Model ${this.table || this._getName()}.${key} is not ${dataType}.`)
        }
      }
    }
    return get(data, key, defaultProps)
  }

  /**
   * set PropTypes in Model
   * @param {Object} data data response from API
   * @example
   * static set(data) {
   *   const { string, number, bool, array, object, timestamp } = this.propTypes(data)
   *   return {
   *     ...
   *   }
   * }
   */
  static propTypes(data) {
    return {
      string: (key, defaultProps = '', isRequired) => this._model(data, key, defaultProps, isRequired, 'string'),
      number: (key, defaultProps = 0, isRequired) => this._model(data, key, defaultProps, isRequired, 'number'),
      bool: (key, defaultProps = false, isRequired) => this._model(data, key, defaultProps, isRequired, 'boolean'),
      array: key => this._model(data, key, []),
      object: key => this._model(data, key, {}, 'object'),
      timestamp: (key, isRequired) => this._model(data, key, 0, isRequired, 'number'),
    }
  }

  /**
   * Set PropTypes in Model
   * @return {Function}
   * @example
   * // Set Data Model
   * static isRequired = {
   *   description: false
   * }
   * 
   * static set(data) {
   *   const { string, number, array, bool, object } = this.propTypes(data)
   *   return {
   *     id: string('id'),
   *     shop: object('shop'),
   *     descripiton: object('description'),
   *     price: number('price'),
   *     products: array('items'),
   *     createdAt: timestamp('created_at'),
   *   }
   * }
   * 
   * // Usage
   * static propTypes = {
   *   data: Model.setPropTypes()
   * }
   * 
   * // is Equal to
   * static propTypes = {
   *   data: PropTypes.shape({
   *     id: PropTypes.string.isRequired,
   *     shop: PropTypes.object.isRequired,
   *     description: PropTypes.string,
   *     price: PropTypes.number.isRequired,
   *     products: PropTypes.array.isRequired,
   *     createdAt: PropTypes.number.isRequired,
   *   })
   * }
   * 
   */
  static setPropTypes() {
    const data = this.set()
    const propTypes = {}
    Object.keys(data).forEach(key => {
      const dataType = typeof data[key]
      let name
      if(Array.isArray(data[key])) {
        name = 'array'
      } else {
        switch(dataType) {
          case 'function':
            name = 'func'
            break
          case 'boolean':
            name = 'bool'
            break
          default:
            name = dataType
        }
      }
      const isRequired = get(this.isRequired, key, true)
      if(isRequired) {
        propTypes[key] = PropTypes[name].isRequired
      } else {
        propTypes[key] = PropTypes[name]
      }
    })
    return PropTypes.shape(propTypes)
  }

  /**
   * Mock Data List Model
   * @param {number} count count of Array Data
   * @return {Array.<Object>}
   * @example
   * Model.fakerList(10)
   */
  static fakerList(count) {
    const arr = []
    for(let i = 0; i < count; i++) {
      arr.push(i + 1)
    }
    return arr.map(() => this.faker())
  }
}

export default Model
