import seamlessImmutableTransformer from 'utils/immutablePersistenceTransform/transformer'
import localStorage from 'redux-persist/lib/storage'
// import sessionStorage from 'redux-persist/lib/storage/session'
import _ from 'lodash'

const getCSRFExpiredTime = () => {
  const minutes = 60
  const d = new Date()
  d.setTime(d.getTime() + (minutes * 60 * 1000))
  return `expires = + ${d.toUTCString()}`
}

const getDefaultCSRFKey = () => {
  const expires = getCSRFExpiredTime()
  const cvalue = _.times(30, () => _.random(35).toString(36)).join('')
  document.cookie = `XSRF-TOKEN-DEFAULT=${cvalue}; ${expires}; path=/;`;
  return cvalue
}

// Session encrypt
const transformer = seamlessImmutableTransformer({
  secretKey: function() {
    const cookie = _.chain(document.cookie).split(';').map(_.partial(_.trim)).map(_.partial(_.split, _, '=', 2)).fromPairs().value()
    const csrfToken = cookie['XSRF-TOKEN']
    const csrfTokenDefault = cookie['XSRF-TOKEN-DEFAULT'] || (!csrfToken ? getDefaultCSRFKey() : null)
    if (!csrfToken) {
      const expires = getCSRFExpiredTime()
      document.cookie = `XSRF-TOKEN=${csrfTokenDefault}; ${expires}; path=/mg-c;`;
      document.cookie = "XSRF-TOKEN-DEFAULT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    return csrfToken || csrfTokenDefault
  },
  onError: function (error) {
    // Handle the error.
    console.error('transform error', error)
  }
})

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'LDZs5gcN',
    storage: localStorage,
    blacklist: [], // reducer keys that you do NOT want stored to persistence here
    whitelist: ['application', 'registerOrder', 'url'], // Optionally, just specify the keys you DO want stored to
    transforms: [transformer]
  }
}

export default REDUX_PERSIST
