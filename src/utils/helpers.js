import ENV from '../SERVICES/xhr/config'
// import loginService from '../SERVICES/loginService'

export default {
  makePhotoUrl: function (endpoint) {
    return `${ENV.photoPreviewUrl.replace(/\/$/, '')}${endpoint}`
  },
  validateCodeUrl: function (endpoint) {
    endpoint = `/${ENV.hostEndpoint}` + endpoint
    return this.makePhotoUrl(endpoint)
  },
  html_encode: function (str) {
    var s = ''
    if (str.length === 0) return ''
    s = str.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/'/g, '&#39;')
    s = s.replace(/"/g, '&quot;')
    s = s.replace(/\n/g, '<br>')
    return s
  },
  html_decode: function (text) {
    // 1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement('div')
    // 2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text
    // 3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    var output = temp.innerText || temp.textContent
    temp = null
    return output
  },
  /**
   * 废弃 别用
   * 用这个 window.moment(date).format('YYYY-MM-DD HH:mm')
   * @param  {[type]} date [description]
   * @param  {[type]} fmt  [yyyy-MM-dd HH:mm:ss]
   * @return {[type]}      [description]
   */
  dateFormat: function (val, fmt) {
    const date = new Date(val)
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  },
  isLogin: function () {
    const accessToken = localStorage.getItem('accessToken')
    const accessTokenTime = localStorage.getItem('accessTokenTime')
    const openId = localStorage.getItem('openId')
    const isBinding = sessionStorage.getItem('isBinding')
    const isOut = localStorage.getItem('isOut')
    if (isOut === '' || isOut === null || isOut === 'null') {
      return false
    } else if (isOut === 'true') {
      // 点击过退出登录的情况
      return false
    } else {
      if (!openId) {
        if (accessToken && accessTokenTime) {
          if (Math.floor((new Date().getTime() - accessTokenTime) / 3600000) < 9) {
            return true
          }
          // else { // 这个可能没用
          //   if (typeof isLogin === 'boolean') { // 处理未绑定微信帐号的微信登录情况
          //     return isLogin
          //   }
          // }
        }
      } else { // 获取到openid
        if (isBinding === 'false') { // 处理未绑定微信帐号的微信登录情况
          return false
        } else {
          return true
        }
      }
    }
    return false
  },
  initHead: function (route) {
    let redirectPath = ''
    // const fullPath = this.$router.currentRoute.fullPath
    // console.info('fullPath====>' + fullPath)
    let { redirect } = route.query
    if (redirect) {
      // console.info(decodeURIComponent(redirect))
      redirectPath = decodeURIComponent(redirect)
    }
    return redirectPath
  }
}
