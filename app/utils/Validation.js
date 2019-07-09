import moment from 'moment'
import _forEach from 'lodash/forEach'
import _ from 'lodash'
// const validator = require('validator')

export default class Validation {
  static validatePriceRange(from, to) {
    if (from && to && parseInt(from, 10) > parseInt(to, 10)) {
      return {
        result: 'error',
        message: '価格の範囲を正しく入力してください。'
        // message: `${from}～${to}の範囲で入力してください。`
      }
    }
    return {
      result: 'success'
    }
  }

  static validateNumberRange(from, to) {
    if (from && to && from > to) {
      return {
        result: 'error',
        message: '有効な範囲を入力してください。'
        // message: `${from}～${to}の範囲で入力してください。`
      }
    }
    return {
      result: 'success'
    }
  }

  static validateDurationRange(from, to) {
    if (from && to && parseInt(from, 10) > parseInt(to, 10)) {
      return {
        result: 'error',
        message: '有効な期間を入力してください。'
      }
    }
    return {
      result: 'success'
    }
  }

  static isDate(value, format) {
    if (value && moment(value).format(format || 'YYYY-MM-DD') !== value) {
      return {
        result: 'error',
        // message: '有効な日付を入力してください。 (YYYY-MM-DD)。'
        message: '半角で「YYYY-MM-DD」形式で入力してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static validateDateRange(from, to, format) {
    const fromDate = from && moment(from, format || 'YYYY-MM-DD')
    const toDate = to && moment(to, format || 'YYYY-MM-DD')
    if ((fromDate && fromDate.format(format || 'YYYY-MM-DD') !== from) || (toDate && toDate.format(format || 'YYYY-MM-DD') !== to)) {
      return {
        result: 'error',
        // message: '有効な日付を入力してください。 (YYYY-MM-DD)。'
        message: '半角で「YYYY-MM-DD」形式で入力してください。'
      }
    } else if (fromDate && toDate && fromDate > toDate) {
      return {
        result: 'error',
        // message: '有効な期間を入力してください。'
        message: '終了日は、開始日以降の日付を入力してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static isEmpty(value) {
    if (_.isNil(value) || value === '') {
      return {
        result: 'error',
        // message: 'この値を入力してください。'
        message: '必須です。入力してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static isEmptyImage(value) {
    if (_.isNil(value) || value === '') {
      return {
        result: 'error',
        message: '画像を選択してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static isSelected(value) {
    if (!value || value === '') {
      return {
        result: 'error',
        // message: 'この値を選択してください。'
        message: '必須です。選択してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static isSelectedCheckBox(value) {
    if (_.isEmpty(value)) {
      return {
        result: 'error',
        message: '１つ以上選択してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static validatePhoneNumber(value) {
    if (!value) {
      return {result: 'success'}
    }

    // const phoneNumber = value && value.split("-")
    if (value.split("-").includes("")) {
      return {
        result: 'error',
        message: '全ての項目を入力してください。'
      }
    }

    if (value.length !== 12 && value.length !== 13) {
      return {
        result: 'error',
        // message: '有効な電話番号を入力してください。'
        message: '半角数字で正しい電話番号を入力してください。'
      }
    }

    if (!new RegExp(/[0-9]{2,5}\-[0-9]{1,4}\-[0-9]{3,4}/g).test(value)) {
      return {
        result: 'error',
        message: '半角数字で正しい電話番号を入力してください。'
      }
    }

    // if (phoneNumber && phoneNumber.length !== 3) {
    //   return {
    //     result: 'error',
    //     // message: '有効な電話番号を入力してください。'
    //     message: '半角数字で正しい電話番号を入力してください。'
    //   }
    // }

    // if (phoneNumber && phoneNumber.length === 3) {
    //   if (phoneNumber[0].length < 2 || phoneNumber[1].length < 1 || phoneNumber[2].length < 4) {
    //     return {
    //       result: 'error',
    //       // message: '有効な電話番号を入力してください。'
    //       message: '半角数字で正しい電話番号を入力してください。'
    //     }
    //   }
    // }

    return {
      result: 'success'
    }
  }

  static validateEmail(value) {
    if (value) {
      // const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // https://qiita.com/sta/items/848e7a8c4699a59c604f#%E5%8D%8A%E8%A7%92%E8%8B%B1%E6%95%B0%E5%AD%97%E8%A8%98%E5%8F%B7
      const regexEmail = /^[a-zA-Z0-9!"#$%&'()-^\@\[;:\]\,.\/\\\=\~\|\`\{\+\*\}\<\>\?\_]+$/
      // !"#$%&'()-^\@[;:],./\=~|`{+*}<>?_
      if (!regexEmail.test(value)) {
        return {
          result: 'error',
          // message: '有効なメールアドレスを入力してください。'
          message: '半角英数字記号で入力してください。'
        }
      }

      return {
        result: 'success'
      }
    }
    return {
      result: 'success'
    }
  }

  static validateFax(value) {
    if (value) {
      // const faxNumber = value && value.split("-")

      if (value.length !== 12 && value.length !== 13) {
        return {
          result: 'error',
          message: '半角数字で正しいFAX番号を入力してください。'
        }
      }

      if (!new RegExp(/[0-9]{2,5}\-[0-9]{1,4}\-[0-9]{3,4}/g).test(value)) {
        return {
          result: 'error',
          message: '半角数字で正しいFAX番号を入力してください。'
        }
      }
      // if (value && (value.length !== 12 && value.length !== 13)) {
      //   return {
      //     result: 'error',
      //     // message: '有効な電話番号を入力してください。'
      //     message: '半角数字で正しいFAX番号を入力してください。'
      //   }
      // }

      // if (faxNumber && faxNumber.length !== 3) {
      //   return {
      //     result: 'error',
      //     // message: '有効なFAX番号を入力してください。'
      //     message: '半角数字で正しいFAX番号を入力してください。'
      //   }
      // }

      // if (faxNumber && faxNumber.length === 3) {
      //   if (faxNumber[0].length < 2 || faxNumber[1].length < 1 || faxNumber[2].length < 4) {
      //     return {
      //       result: 'error',
      //       // message: '有効なFAX番号を入力してください。'
      //       message: '半角数字で正しいFAX番号を入力してください。'
      //     }
      //   }
      // }

      return {
        result: 'success'
      }
    }
    return {
      result: 'success'
    }
  }

  static validateJustNumber(value) {
    if (value && value !== "0" && !parseInt(value, 10)) {
      return {
        result: 'error',
        message: '数値を入力してください。'
      }
    }

    return {
      result: 'success'
    }
  }

  static validateMaxLength(value, maxLength, type) {
    // start
    // this add for enter cont = 2 charactor
    // let nextValue = `${value}`
    let length
    if (!_.isNil(value)) {
      const temp = value + ''
      length = temp.replace(/(?:\r\n|\r|\n)/g, '').length + (temp.split(/\r\n|\r|\n/).length - 1) * 2
    } else {
      length = 0
    }
    // end
    if (typeof type !== 'undefined' && type === 'textarea') {
      if (value && length > maxLength) {
        return {
          result: 'error',
          message: `${maxLength}文字以内で入力してください（改行もカウントされます）。`
        }
      }
    }
    if (value && length > maxLength) {
      return {
        result: 'error',
        message: `${maxLength}文字以内で入力してください。`
      }
    }

    return {
      result: 'success'
    }
  }

  static validateKanaChar(value) {
    // if (value && !_.isNil(_.find(value, c => !(c.match(/^[ァ-ヶー ]*$/) || c.match(/^[ｦ-ﾟ]*$/) || c === '' || c === ' ')))) {
    if (value && new RegExp(/[^\u30A1-\u30FA|\uFF66-\uFF6F|\uFF71-\uFF9D|\u3000\u0020\u30FC\u2010\u002D\u2015\uFF0D\u2212\uFF70]+|[\|]+/).test(value)) {
      return {
        result: 'error',
        message: '全角カタカナで入力してください。'
      }
    }
    return {result: 'success'}
  }

  // static isValidUrl(value) {
  //   if (value && !validator.isURL(value, {protocols: ['http', 'https'], require_protocol: true})) {
  //     return {
  //       result: 'error',
  //       // message: '有効なURLを入力してください。'
  //       message: '「http://」もしくは「https://」から始まるURLを入力してください。'
  //     }
  //   }

  //   return {result: 'success'}
  // }
  static isValidUrl(value) {
    if (value && !new RegExp(/^http:\/\/|^https:\/\//).test(value)) {
      return {
        result: 'error',
        message: '「http://」もしくは「https://」から始まるURLを入力してください。'
      }
    } else if (value && new RegExp(/[^\x00-\x7F]+/).test(value)) {
      return {
        result: 'error',
        message: '半角英数字記号で入力してください。'
      }
    }
    return {result: 'success'}
  }

  static isNil(value) {
    if (_.isNil(value)) {
      return {
        result: 'error',
        // message: '有効なURLを入力してください。'
        message: '必須です。選択してください。'
      }
    }

    return {result: 'success'}
  }

  static validateAllRules(validateRules) {
    const results = {}
    _forEach(validateRules, (rules, key) => {
      for (let i = 0; i < rules.length; i++) {
        const validatorRule = rules[i]
        const validateResult = validatorRule()
        if (validateResult && validateResult.result !== 'success') {
          results[key] = validateResult
          break
        }
      }
    })

    return results
  }
}

