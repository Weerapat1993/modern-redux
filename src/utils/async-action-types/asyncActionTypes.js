/** 
 * @typedef {Object} AsyncActionTypes
 * @property {string} REQUEST
 * @property {string} SUCCESS
 * @property {string} FAILURE
 */

export const asyncActionType = (type) => ({
  REQUEST: type+'_REQUEST',
  SUCCESS: type+'_SUCCESS',
  FAILURE: type+'_FAILURE',
})

export const crudActionType = (name) => ({
  LIST: asyncActionType(`${name}_LIST`),
  DETAIL: asyncActionType(`${name}_DETAIL`),
  CREATE: asyncActionType(`${name}_CREATE`),
  UPDATE: asyncActionType(`${name}_UPDATE`),
  DELETE: asyncActionType(`${name}_DELETE`),
})