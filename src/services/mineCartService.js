import xhr from './xhr/http'

/**
 * 购物车资源 API
 */
class MineCartService {
  /**
   * 产品列表资源
   * @return {Array}
   */
  loadCarlist (area) {
    return xhr.fetch('/order/carlist.json', {
      type: 'GET',
      needAuth: true,
      data: {
        area: area
      }
    })
  }

// 获取购物车商品总数
  getCarCount () {
    return xhr.fetch('/order/carcount.json', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 生成订单
   * @param {string} ids 购物车产品id
   */
  addOrder (ids) {
    return xhr.fetch('/order/build.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }

  /**
   * 删除购物车中的产品
   * @param  {string} id [购物车产品id]
   * @return {[type]}     [description]
   */
  deleteCar (id) {
    return xhr.fetch('/order/deletecar.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
  /**
   * 批量删除购物车中的产品
   * @param  {string} id [购物车产品id]
   * @return {[type]}     [description]
   */
  deletecarList (ids) {
    return xhr.fetch('/order/deletecarList.json', {
      type: 'POST',
      needAuth: true,
      data: {
        ids: ids
      }
    })
  }

}

// 实例化后导出，全局单例
export default new MineCartService()
