export default {
  required: function (value) {
    if (typeof value === 'boolean') return value
    return !((value === null) || (value.length === 0))
  },
  numeric: function (value) {
    return (/^-?(?:0$0(?=\d*.)|[1-9]|0)\d*(.\d+)?$/).test(value)
  },
  integer: function (value) {
    return (/^(-?[1-9]\d*|0)$/).test(value)
  },
  digits: function (value) {
    return (/^[\d() .:\-+#]+$/).test(value)
  },
  alpha: function (value) {
    return (/^[a-zA-Z]+$/).test(value)
  },
  alphaNum: function (value) {
    return !(/\W/).test(value)
  },
  url: function (value) {
    return (/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i).test(value)
  },
  minLength: function (value, arg) {
    return value && value.length && value.length >= +arg
  },
  maxLength: function (value, arg) {
    return value && value.length && value.length <= +arg
  },
  length: function (value, arg) {
    return value && value.length === +arg
  },
  min: function (value, arg) {
    return value >= +arg
  },
  max: function (value, arg) {
    return value <= +arg
  },
  pattern: function (value, arg) {
    var match = arg.match(new RegExp('^/(.*?)/([gimy]*)$'))
    var regex = new RegExp(match[1], match[2])
    return regex.test(value)
  },
  mobile: function (value) {
    return (/^1(3|4|5|7|8)\d{9}$/).test(value)
  },
  isEmojiCharacter: function (substring) {
    for (let i = 0; i < substring.length; i++) {
      let hs = substring.charCodeAt(i)
      if (hs >= 0xd800 && hs <= 0xdbff) {
        if (substring.length > 1) {
          let ls = substring.charCodeAt(i + 1)
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
          if (uc >= 0x1d000 && uc <= 0x1f77f) {
            return true
          }
        }
      } else if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1)
        if (ls === 0x20e3) {
          return true
        }
      } else {
        if (hs >= 0x2100 && hs <= 0x27ff) {
          return true
        } else if (hs >= 0x2B05 && hs <= 0x2b07) {
          return true
        } else if (hs >= 0x2934 && hs <= 0x2935) {
          return true
        } else if (hs >= 0x3297 && hs <= 0x3299) {
          return true
        } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
          return true
        }
      }
    }
  },
  idCard: function (value) {
    return (/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(value))
  },
  isMumOrLetter: function (value) {
    return (/(^[A-Za-z0-9]+$)/.test(value))
  }
}
