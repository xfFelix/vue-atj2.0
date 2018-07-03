import xhr from './xhr/http'
// import xhr from './xhr'

/**
 * 测试所用到的 API
 */
class TestService {

  /**
   * 测试
   * @return {[type]} [description]
   */
  loadList () {
    // return xhr({
    //   url: '/list.json'
    // })
    return xhr.fetch('/test/list.json', {
      type: 'POST',
      data: {
        id: '123'
      }
    })
  }

}

// 实例化后导出，全局单例
export default new TestService()
