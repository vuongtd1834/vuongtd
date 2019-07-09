import {detect} from 'detect-browser'

const toLocaleString = number => {
  if (detect().name === "ie" && (detect().version.includes("9.0") || detect().version.includes("10.0"))) {
    return number.toLocaleString().length > 3 ? number.toLocaleString().substring(0, number.toLocaleString().length - 3) : 0
  } else
    return number.toLocaleString()
}
export default {
  toLocaleString
}
