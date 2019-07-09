import {createReducer, createActions} from 'reduxsauce'
import immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setUrl: ['url'],
})

export const ImageTypes = Types
export default Creators

/* ------------- Initial State ------------- */
const INITIAL_STATE = immutable({
  parentUrl: ''
})

const setUrl = (state, {url}) => state.merge({parentUrl: url})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_URL]: setUrl,
})

