import xhr from './xhr/http'

/**
 * 支付
 */
class PayService {

  /**
   * [payment description]
   * @param  {[type]} id      [description]
   * @param  {[type]} payType [1.微信支付，2.支付宝支付]
   * @return {[type]}         [description]
   */
  payment (id, payType, openId) {
    return xhr.fetch('/payment/pay.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        payType: payType,
        openId: openId
      }
    })
  }

  paymentfrist () {
    return xhr.fetch('/payment/wxUserAuth', {
      type: 'POST',
      needAuth: true
    })
  }

}

// 实例化后导出，全局单例
export default new PayService()
