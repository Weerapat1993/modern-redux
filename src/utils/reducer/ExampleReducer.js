import { Reducer } from './Reducer'
import { classReducer } from './BaseReducer'

/**
 * @class ExampleReducer
 * @extends Reducer
 */
export class ExampleReducer extends Reducer {
  initialState = {
    keys: {},
    byID: [],
  }

  getState() {
    const { type, data } = this.action
    switch(type) {
      case 'REQUEST':
        return this.setStateWithKeyRequest()
      case 'SUCCESS': 
        return this.setStateWithKeySuccess({ data })
      case 'FAILURE': 
        return this.setStateWithKeyFailure()
      case 'SET_STATE': 
        return this.setState({ byID: ['HI'] })
      case 'SET_STATE_WITH_KEY': 
        return this.setStateWithKey({ error: '' })
      case 'UPDATE_KEY':
        return this.setStateWithKey({ 
          data: {
            ...this.getStateWithKey().data,
            ...data,
          } 
        })
      case 'NORMALIZE_DATA':
        return this.setState({ keys: this.normalizeData(data) })
      default:
        return this.state
    }
  }
}

export const exampleReducer = classReducer(ExampleReducer)


