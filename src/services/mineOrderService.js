import xhr from './xhr/http'

/**
 * 订单资源 API
 */
class MineOrderService {
  /**
   * 订单列表资源
   * @return {Array}
   */
  loadOrderlist (pageNo, pageSize) {
    return xhr.fetch('/order/list.json', {
      type: 'GET',
      needAuth: true,
      data: {
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

  /**
   * 订单详情资源
   * @return {Object}
   */
  loadOrder (id) {
    return xhr.fetch('/order/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 订单修改
   * @return {Object}
   */
  saveOrder (way, hospitalid, id, patientId, startDate, remarks) {
    return xhr.fetch('/order/save.json', {
      type: 'POST',
      needAuth: true,
      data: {
        way: way,
        hospitalid: hospitalid,
        id: id,
        patientId: patientId,
        startDate: startDate,
        remarks: remarks
      }
    })
  }

  /**
   * 订单删除
   * @return {Object}
   */
  deleteOrder (id) {
    return xhr.fetch('/order/delete.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 订单取消
   * @return {Object}
   */
  cancelOrder (id) {
    return xhr.fetch('/order/cancel.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 订单取消
   * @return {Object}
   */
  payOrder (id) {
    return xhr.fetch('/order/payOrder.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 订单产品列表
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  loadOrdePproducts (id) {
    return xhr.fetch('/order/productlist.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 保存评论信息
   * @param  {[type]} comments [description]
   * @return {[type]}          [description]
   */
  saveComment (comments) {
    return xhr.fetch('/comment/saveComment.json', {
      type: 'POST',
      needAuth: true,
      data: {
        remarks: comments
      }
    })
  }
  /**
   * 提交退款申请
   * @return {[type]} [description]
   */
  saveRefund ({id, reason}) {
    return xhr.fetch('/refund/reimburse.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        reason: reason
      }
    })
  }

  /**
   * 查看退款详情
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getRefund (id) {
    return xhr.fetch('/refund/RefundRecord.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 采血站点列表
   */
  loadDotList (city, pageNo, pageSize) {
    return xhr.fetch('/BdHospital/spgetlist.json', {
      type: 'POST',
      data: {
        city: city,
        pageNo: pageNo,
        pageSize: pageSize
      }
    })
  }

}

// 实例化后导出，全局单例
export default new MineOrderService()
