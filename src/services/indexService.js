import xhr from './xhr/http'

/**
 * 首页资源 API
 */
class IndexService {
  /**
   * 轮播资源
   * @return {Array}
   */
  loadSwipeItems () {
    return xhr.fetch('/page/turnlist.json')
  }

  /**
   * 轮播图片跳转详情数据
   * @param  {String} id
   * @return {String}
   */
  loadSwipeInfo (id) {
    return xhr.fetch('/page/turnContent.json', {
      type: 'POST',
      data: {
        id: id
      }
    })
  }
  /**
   * 优惠套餐资源
   * @return {Array}
   */
  loadDiscountItems (pageNo, pageSize, area) {
    return xhr.fetch('/page/mainlist.json', {
      type: 'POST',
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        area: area
      }
    })
  }
  /**
   * 首页商品列表
   * @return {Array}
   */
  loadMaterialList () {
    return xhr.fetch('/page/getArticleList.json', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 首页商品详情
   */
  loadMaterialDetail (id) {
    return xhr.fetch('/page/getPageTurn.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 建议
   * @return {Array}
   */
  addSuggest (suggests) {
    return xhr.fetch('/suggest/addSuggest.json', {
      needAuth: true,
      type: 'POST',
      data: {
        suggests: suggests
      }
    })
  }

  loadNavigation () {
    return xhr.fetch('/page/filter.json')
    // {sex: [{text: '男', val: 1 }, {text: '女', val: 2 }], age: [{text: '1-18', val: 1 }, {text: '19-44', val: 2 }, {text: '45-65', val: 3 }, {text: '66-100', val: 4 }], parts: [{text: '心脏', val: 1, sex: 0 }, {text: '肝', val: 2, sex: 0 }, {text: '脾', val: 3, sex: 0 }, {text: '前列腺', val: 4, sex: 1 }, {text: '子宫', val: 5, sex: 2 }], symptoms: [{text: '心绞痛', val: 1, sex: 0, parts: 1 }, {text: '前列腺痛', val: 2, sex: 1, parts: 4 }, {text: '子宫痛', val: 3, sex: 2, parts: 5 }, {text: '肝痛', val: 4, sex: 0, parts: 2 }] }
  }

  loadJsConfig (url) {
    return xhr.fetch('/wechatlogin/getJsConfig.json', {
      type: 'POST',
      data: {
        url: url
      }
    })
  }
}

// 实例化后导出，全局单例
export default new IndexService()
