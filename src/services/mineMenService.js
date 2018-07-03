import xhr from './xhr/http'

/**
 * 就诊人资源 API
 */
class MineMenService {
  /**
   * 就诊人列表资源
   * @return {Array}
   */
  loadPatientlist () {
    return xhr.fetch('/my/patient/list.json', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 保存或修改就诊人信息
   * @param
   */
  addPatient ({id, name, gender, telephone, birthday, idcard, socialSecurityNo, areaId, address}) {
    return xhr.fetch('/my/patient/save.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        name: name,
        gender: gender,
        telephone: telephone,
        birthday: birthday,
        idcard: idcard,
        socialSecurityNo: socialSecurityNo,
        areaId: areaId,
        address: address
      }
    })
  }

  /**
   * 删除就诊人信息
   * @param
   */
  deletePatient (id) {
    return xhr.fetch('/my/patient/delete.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 查询就诊人信息
   * @param
   */
  changePatient (id, orderId) {
    return xhr.fetch('/my/patient/change.json', {
      type: 'POST',
      needAuth: true,
      data: {
        id: id,
        orderId: orderId
      }
    })
  }
  /**
   * 查询就诊人信息
   * @param
   */
  getPatient (id) {
    return xhr.fetch('/my/patient/detail.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }
}

// 实例化后导出，全局单例
export default new MineMenService()
