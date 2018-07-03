import $http from 'superagent'
import ENV from './config'
// 引入提示框组建
import { Toast } from 'mint-ui'

/**
* 合并对象
* @private
* @method merge
* @param {Object} defaultOptions
* @param {Object} options
* @return {Object} 返回已合并对象
*/
function merge (defaultOptions, options) {
  if (typeof (options) !== 'object') {
    options = {}
  }
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      defaultOptions[key] = options[key]
    }
  }
  return defaultOptions
}

var request = {
  /**
  * 从     中获取当前用户的信息，包含token，id，username等
  * @private
  * @method currentUser
  * @return {Object} 用户信息对象
  */
  currentUser: function () {
    return '用户信息' // store.state.myAccount
  },
  /**
  * 传入资源名，返回拼接的完整路径
  * @private
  * @method makeUrl
  * @param {Object} endpoint
  * @return {String} url
  */
  makeUrl: function (endpoint) {
    return `${ENV.baseURL.replace(/\/$/, '')}/${endpoint}`
  },
  /**
  * 公用http请求方法，根据参数发起请求，返回promise对象
  * @private
  * @method makeRequest
  * @param {Object} url
  * @param {Object} options
  * @return {Object} description
  */
  makeRequest: function (url, options) {
    var defaultOptions = {
      url: url,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/json'
      }
    }

    var params = merge(defaultOptions, options || {})

    // 如果需要传输数据
    if (options && options.data) {
      params.data = options.data
    }
    // 如果需要认证
    if (options && options.needAuth) {
      delete params.needAuth
      let accessToken = localStorage.getItem('accessToken')
      params.headers['Authentication-Token'] = accessToken
    }
    // 需要全局loading
    if (options && options.loading) {
      console.info(`start loading ${params.url}`)
      // showLoading(true)
    }
    return new Promise(function (resolve, reject) {
      var httpClient = $http[params.type.toLowerCase()](params.url)
      if (params.headers) {
        httpClient.set(params.headers)
      }
      if (params.type.toLowerCase() === 'get' && params.data) {
        httpClient.query(params.data)
      }
      // 增加对content-type的支持，不同content-type需要不同的encode
      if (params.contentType) {
        httpClient.type(params.contentType)
      }

      if (params.type.toLowerCase() !== 'get' && params.data) {
        httpClient.send(JSON.stringify(params.data))
      }
      httpClient.end(function (err, res) {
        console.info(`stop loading ${params.url}`)
        // showLoading(false)
        if (err) {
          // alert('api error, HTTP CODE: ' + res.status)
          /* Toast({
            message: '操作失败',
            position: 'bottom'
          }) */
          console.error(err)
          console.error(`error url ==>${url}`)
          return reject(err)
        }
        console.info(res)
        if (res.body.code === 200 || res.body.code === 203) {
          // 203 需要在引用中添加用户未登录 跳转
          resolve(res.body)
        } else {
          Toast(res.body.msg)
          console.error(`error url ==>${url}`)
        }
      })
    })
  },
  /**
  * 模块入口,组装url,发起请求
  * @private
  * @method fetch
  * @param {Object} endpoint 资源名
  * @param {Object} options  请求方法等
  * @return {Object} description
  */
  fetch: function (endpoint, options) {
    if (options && options.fullUrl === true) {
      return this.makeRequest(endpoint, options)
    }
    var pathRoot = ENV.serverRootUrl.replace(/\/$/, '')
    var end = endpoint.replace(/^\//, '')

    // 如果urlAssemble为false, 则不组装url前缀
    if (options && options.urlAssemble === false) {
      return this.makeRequest(`${pathRoot}/${end}`, options)
    }
    return this.makeRequest(this.makeUrl(end), options)
  }
}

export default request
