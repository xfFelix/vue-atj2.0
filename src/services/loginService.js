import xhr from './xhr/http'
// import xhr from './xhr'

/**
 * 登录相关 API
 */
class LoginService {

  /**
   * 发送验证码接口
   *
   * @return {[type]} [description]
   */
  sendSms (mobile) {
    return xhr.fetch('/sms/send.json', {
      type: 'POST',
      data: {
        mobile: mobile
      }
    })
  }
  /**
   * 客户端登录验证
   * @param  {[type]} mobile [description]
   * @param  {[type]} code   [description]
   * @return {[type]}        [description]
   */
  memberLogin (mobile, code, number) {
    return xhr.fetch('/sms/member/login.json', {
      type: 'POST',
      data: {
        mobile: mobile,
        code: code,
        number: number
      }
    })
  }

// 退出登录
  memberOut (mobile) {
    return xhr.fetch('/wechatlogin/getOut.json', {
      type: 'POST',
      data: {
        mobile: mobile
      }
    })
  }

  /**
   * 微信授权后自动登录
   *
   * @param  {[type]} code [description]
   * @return {[type]}        [description]
   */
  getAccessToken (code) {
    return xhr.fetch('/wechatlogin/getAccessToken.json', {
      type: 'POST',
      data: {
        code: code
      }
    })
  }

  /**
   * 根据openId自动登录
   * @param  {[type]} openId [description]
   * @return {[type]}        [description]
   */
  autoLogin (openId) {
    return xhr.fetch('/wechatlogin/autoLogin.json', {
      type: 'POST',
      data: {
        openId: openId
      }
    })
  }
}

// 实例化后导出，全局单例
export default new LoginService()
