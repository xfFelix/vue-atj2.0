// 引入第三方 Ajax 请求库'Superagent'也可以引入'jQuery'的ajax库
import request from 'superagent'
// 引入提示框组建
import { Toast } from 'mint-ui'

// 配置API接口地址
// var rootPath = 'https://cnodejs.org/api/v1'
var rootPath = 'http://localhost:8080/jeeplus/api/test'
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterParam (o) {
  for (var key in o) {
    if (o[key] == null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (o[key].length === 0) {
        delete o[key]
      }
    }
  }
  return o
}

const xhr = ({ method = 'get', url, params = null }) => {
  return new Promise(function (resolve, reject) {
    // application/json
    var httpClient = request(method, rootPath + url).type('text/plain')
    if (params) {
      params = filterParam(params)
      if (method === 'POST' || method === 'PUT') {
        if (toType(params) === 'object') {
          params = JSON.stringify(params)
        }
        httpClient.send(params)
      } else if (method === 'GET' || method === 'DELETE') {
        httpClient.query(params)
      }
    }
    httpClient.end(function (err, res) {
      console.info(`stop loading ${url}`)
      // showLoading(false)
      if (err) {
        // alert('api error, HTTP CODE: ' + res.status)
        Toast({
          message: '操作失败',
          position: 'bottom'
        })
        console.err(`error url ==>${url}`)
        return reject(err)
      }
      resolve(res.body)
      // if (res.body.success === true) {
      //   resolve(res)
      // } else {
      //   return reject(err)
      // }
    })
  })
}

/**
 * XHR 请求接口定义
 * @param  {String} options.method 请求方法（默认为 get）
 * @param  {String} options.url    请求路径（基于 rootPath 地址）
 * @param  {Object} options.params   请求体（例如后端 Express 可使用 req.params 获取该对象）
 * @return {Promise}
 *
 * 本 Demo 的 API 封装格式为 { success: <Boolean>, errMsg: <String>, data: <Any> }
 */
export default xhr
