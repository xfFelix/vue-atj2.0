import xhr from './xhr/http'

/**
 * 账户信息 API
 */
class MineInfoService {
  /**
   * 账户信息加载
   */
  loadMineInfo () {
    return xhr.fetch('/accountInfo/getAccount.json', {
      type: 'GET',
      needAuth: true
    })
  }
  /**
   * 地区列表数据
   * @return {[type]} [description]
   */
  loadAreaList () {
    return xhr.fetch('/area/getAreaList.json')
  }

  /**
   * 保存或修改账户信息
   * @param
   */
  updateAccount ({name, gender, telephone, birthday, idCard, socialSecurityNo, areaId, address}) {
    return xhr.fetch('/accountInfo/updateAccount.json', {
      type: 'POST',
      needAuth: true,
      data: {
        name: name,
        gender: gender,
        telephone: telephone,
        birthday: birthday,
        idcard: idCard,
        socialSecurityNo: socialSecurityNo,
        areaId: areaId,
        address: address
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MineInfoService()
