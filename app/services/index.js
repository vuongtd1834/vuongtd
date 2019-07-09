import axios from 'axios'
import AppConfig from '../config/AppConfig'
// import DebugConfig from '../config/DebugConfig'
import {convertResponse} from './ApiMonitor'
import _ from 'lodash'
import {paramsSerializer, transformPostParams} from 'utils/paramsSerializer'

axios.defaults.withCredentials = true
axios.defaults.baseURL = AppConfig.serviceBaseURL
axios.defaults.paramsSerializer = paramsSerializer

// convert all params from int, null to string, blank
axios.defaults.transformRequest =  _.concat((data, headers) => {
  if (!_.isNil(data)) return transformPostParams(data);
  return data;
}, axios.defaults.transformRequest)

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // if (DebugConfig.useReactotron) {
  //   console.tron.apiResponse(...convertResponse(response))
  // }
  return response
}, function (error) {
  return Promise.reject(error)
})

const errorHandler = e => {
  if (e.response && e.response.data && e.response.data.error) {
    return Promise.resolve(e.response.data)
  } else if (e.response) {
    return Promise.resolve({error: {code: e.response.status}})
  }
  return Promise.resolve()
}

export const getAPI = (target, params, settings = {}) => axios.get(target, {
  ...settings,
  params: params || {}
}).then(resp => {
  if (!resp.data) {
    return Promise.resolve({error: {code: resp.status === 205 ? 303 : resp.status}})
  }
  return Promise.resolve(resp.data)
})
  .catch(errorHandler)

export const postAPI = (target, data) => axios.post(target, data)
  .then(resp => Promise.resolve(resp.data))
  .catch(errorHandler)

export const putAPI = (target, data) => axios.put(target, data)
  .then(resp => Promise.resolve(resp.data))
  .catch(errorHandler)

export const delAPI = (target, data) => axios.delete(target, data)
  .then(resp => Promise.resolve(resp.data))
  .catch(errorHandler)
