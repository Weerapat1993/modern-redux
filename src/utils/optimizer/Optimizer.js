/**
 * @class Optimizer
 */
export class Optimizer {
  /**
   * check data props in shouldComponentUpdate
   * @param {Object} prevProps
   * @param {Object} nextProps
   * @return {boolean}
   */
  static isShouldRenderProps(prevProps, nextProps) {
    const prev = this._removeFunction(prevProps)
    const next = this._removeFunction(nextProps)
    return this._jsonEqual(prev, next)
  }

  /**
   * check data state in shouldComponentUpdate
   * @param {Object} prevState
   * @param {Object} nextState
   * @return {boolean}
   */
  static isShouldRenderState(prevState, nextState) {
    const prev = this._removeFunction(prevState)
    const next = this._removeFunction(nextState)
    return this._jsonEqual(prev, next)
  }

  /**
   * JSON comparison
   * @param {Object} dataA
   * @param {Object} dataB
   * @return {boolean}
   */
  static _jsonEqual(dataA, dataB) {
    const a = JSON.stringify(dataA)
    const b = JSON.stringify(dataB)
    return a === b
  }

  /**
   * Remove Function in Object
   * @param {Object} obj
   * @param {boolean} [notRecusive]
   * @return {Object}
   */
  static _removeFunction(obj, notRecusive = false) {
    if (!obj) return {}
    const newObj = {}
    Object.keys(obj).forEach(((key) => {
      if (typeof obj[key] !== 'function') {
        if (Array.isArray(obj[key]) || notRecusive) {
          newObj[key] = obj[key]
        } else if (typeof obj[key] === 'object') {
          newObj[key] = this._removeFunction(obj[key], true)
        } else {
          newObj[key] = obj[key]
        }
      }
    }))
    return newObj
  }

  /**
   * check data state & props in shouldComponentUpdate
   * @param {Object} prevProps
   * @param {Object} nextProps
   * @param {Object} prevState
   * @param {Object} nextState
   * @param {boolean} [isWarning]
   * @return {boolean}
   */
  static isShouldRender(prevProps, nextProps, prevState, nextState, isWarning = true) {
    const checkProps = this.isShouldRenderProps(prevProps, nextProps)
    const checkState = this.isShouldRenderState(prevState, nextState)
    if (checkProps && checkState && isWarning) console.warn('Optimizer: shouldComponentUpdate does not render.')
    return checkProps && checkState
  }
}

export default Optimizer
