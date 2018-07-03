
import xhr from './xhr/http'

/**
 * 购物车资源 API
 */
class CheckReportService {

  /**
   * 订单列表资源
   * @return {Array}
   */
  loadCheckReportlist (pageNo, pageSize) {
    return xhr.fetch('/report/checkreportlist.json', {
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
  loadCheckReport (id) {
    return xhr.fetch('/report/detailReport.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 医院列表资源
   * @return {Object}
   */
  loadHospitalList (id) {
    return xhr.fetch('/report/hospitalList.json', {
      type: 'GET',
      needAuth: true
    })
  }

  /**
   * 医院报告资源
   * @return {Object}
   */
  loadCheckHospitalReport (id) {
    return xhr.fetch('/report/hospitalDetailReport.json', {
      type: 'GET',
      needAuth: true,
      data: {
        id: id
      }
    })
  }

  /**
   * 订单详情资源
   * @return {Object}
   */
  loadCheckReportInfos (name, number, checknumber) {
    return xhr.fetch('/report/ReportRecord.json', {
      type: 'POST',
      needAuth: true,
      data: {
        name: name,
        number: number,
        checkNumber: checknumber
      }
    })
  }

  loadCheckReportInfo (id, name, number, checknumber) {
    return xhr.fetch('/report/ReportRecord.json', {
      type: 'POST',
      needAuth: true,
      data: {
        recordId: id,
        name: name,
        number: number,
        checkNumber: checknumber
      }
    })
  }

    /**
   * 订单详情资源
   * @return {Object}
   */
  loadCheckReportList () {
    return xhr.fetch('/report/findReportRecord.json', {
      type: 'GET',
      needAuth: true
    })
  }

  loadReportLists (name, number, checknumber, longTime, mobile) {
    return xhr.fetch('/report/findListbyCheck.json', {
      type: 'POST',
      needAuth: true,
      data: {
        patName: name,
        hospitalNo: number,
        patCode: checknumber,
        number: longTime,
        mobile: mobile
      }
    })
  }

  loadReportList (id) {
    return xhr.fetch('/report/findListbyCheck.json', {
      type: 'GET',
      needAuth: true,
      data: {
        recordId: id
      }
    })
  }

}

// 实例化后导出，全局单例
export default new CheckReportService()
