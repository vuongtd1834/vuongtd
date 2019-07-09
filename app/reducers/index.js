import {combineReducers} from 'redux'

export default function createReducer(injectedReducers) {
  return combineReducers({
    url: require('./UrlRedux').reducer,
    ...injectedReducers
  })
}
