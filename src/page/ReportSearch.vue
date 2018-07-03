<template>
  <div>
    <!--container-->
    <div class="form-search-box">
      <div class="item-box">
        <div class="hhxh-flex">
          <div class="flex-0" style="width: .9rem;">医&nbsp;&nbsp;院</div>
          <div class="input-row flex-1 m-l-20 select active-btn" @click="selectHospital">
            <div class="hhxh-flex">
              <input type="text" class="flex-1" placeholder="请输入医院名称" readonly="readonly" v-model="data.hospitalName">
              <i class="arrow-right m-l-20"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="hhxh-flex">
          
          <div class="flex-0" style="width: .9rem;">就诊人</div>
          <div class="input-row flex-1 m-l-20 select active-btn" @click="selectMen">
            <div class="hhxh-flex">
              <input type="text" class="flex-1" placeholder="选择就诊人"  readonly="readonly" v-model="data.name">
              <i class="arrow-right m-l-20"></i>
            </div>
          </div>
          <div class="flex-0 m-l-20">编号</div>
          <div class="input-row flex-1 m-l-20">
            <div class="hhxh-flex">
              <input type="text" class="flex-1" placeholder="请输入编号" v-model="data.checknumber">
            </div>
          </div>
        </div>
      </div>
      
      <div class="item-box hhxh-flex">
        <a class="flex-1 active-btn" :class="{active : data.longTime == 1}" @click="data.longTime = 1">最近一个月</a>
        <a class="flex-1 active-btn" :class="{active : data.longTime == 3}" @click="data.longTime = 3">最近三个月</a>
        <a class="flex-1 active-btn" :class="{active : data.longTime == 6}" @click="data.longTime = 6">最近半年</a>
        <a class="flex-1 active-btn" :class="{active : data.longTime == 12}" @click="data.longTime = 12">最近一年</a>
        <a class="flex-1 active-btn" :class="{active : data.longTime == null || data.longTime == '' || data.longTime == undefined}" @click="data.longTime = null">全部</a>
      </div>
      <div class="item-box text-center">
        <button class="reset active-btn" @click="loadRetrue()">重置</button>
        <button class="search active-btn" @click="loadReportLists()">查询</button>
      </div>
    </div>
    <!-- <div v-if="this.showHishroy === false ">
      <div class="mine-report-h1 text-center">历史查询记录</div>
      <div class="mine-men-container">
        <div class="item-box active-btn" v-for="checkitem in checkReportListitems" @click="goInfos(checkitem.id,checkitem.flag)">
          <div class="hhxh-flex">
            <div class="flex-0">{{checkitem.name}}</div>
            <div class="gray flex-1 m-l-20">{{checkitem.checkNumber}}</div>
            <div class="gray flex-0 m-l-20">{{checkitem.createDate}}</div>
          </div>
          <div class="m-t-15 text-overflow1 title-small">{{checkitem.hospitalname}}</div>
        </div>
      </div>
    </div> -->
    <div v-if="this.ReportListitems.length != 0 ">
      <div class="mine-report-h1 text-center">当前查询结果</div>
      <div class="mine-men-container" v-for="checkitems in ReportListitems">
        <div class="item-box active-btn" @click="goInfos(checkitems.id,checkitems.flag)">
          <div class="hhxh-flex">
            <div class="flex-0">{{checkitems.patName}}</div>
            <div class="gray flex-1 m-l-20">{{checkitems.patCode}}</div>
            <div class="gray flex-0 m-l-20">{{checkitems.reportDay}}</div>
          </div>
          <!-- <div class="m-t-15 text-overflow1 title-small">{{checkitems.hospitalname}}</div> -->
        </div>
      </div>
    </div>
    
    <!--container end-->

    <end-footer></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import { Toast } from 'mint-ui'
// import noData from 'components/noData'
// import mineMenService from 'SERVICES/mineMenService'
import checkReportService from 'SERVICES/checkReportService'
import helpers from '../utils/helpers'
// import {Toast, MessageBox} from 'mint-ui'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    headerData: {
      titel: '体检报告',
      toLink: '/MineReport'
    },
    data: {
      id: '',
      name: '',
      number: '',
      hospitalName: '',
      checknumber: '',
      longTime: null,
      mobile: ''
    },
    showHishroys: false,
    showHishroy: false,
    showSearch: false,
    patientitems: [],
    hospitals: [],
    checkReportListitems: [],
    ReportListitems: []
  }),
  created () {
    this.loadCheckReportList()
    if (sessionStorage.ReportListitems !== undefined) {
      this.ReportListitems = JSON.parse(sessionStorage.ReportListitems)
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'Mine' || from.name !== 'Index') {
      next(vm => {
        vm.data = JSON.parse(sessionStorage.data)
      })
    } else {
      next()
    }
  },
  methods: {
    goMineReportDetail () {
      this.$router.push({
        name: 'MineReportDetail'
      })
    },
    selectMen () {
      sessionStorage.setItem('data', JSON.stringify(this.data))
      this.$router.push({
        name: 'MineMenList'
      })
    },
    selectHospital () {
      sessionStorage.setItem('data', JSON.stringify(this.data))
      this.$router.push({
        name: 'HospitalList'
      })
    },
    loadCheckReportList: function () {
      checkReportService.loadCheckReportList().then(res => {
        this.checkReportListitems = res.t
      })
    },
    loadCheckReportInfo: function () {
      checkReportService.loadCheckReportInfo(this.data.id, this.data.name, this.data.number, this.data.checknumber).then(res => {
        if (res.code === '200') {
          Toast('ss')
        }
        /* this.checkReportListitems = res.t */
      })
    },
    goInfos: function (id, flag) {
      flag = '1'
      if (flag !== '1') {
        Toast('报告未寄出')
      } else {
        sessionStorage.ReportListitems = JSON.stringify(this.ReportListitems)
        id !== '' ? this.$router.push({name: 'MineReportDetail', query: {MineHospitalReportDetailId: id}}) : Toast('订单id为空')
      }
    },
    loadRetrue: function () {
      sessionStorage.clear()
      this.data.longTime = null
      this.ReportListitems = []
      this.showHishroys = false
      this.showHishroy = false
      // this.data.checknumber = ''
      // this.data.number = ''
      // this.data.name = ''
      this.data = {}
    },
    loadReportList: function (id) {
      this.data.id = id
      checkReportService.loadReportList(id).then(res => {
        this.ReportListitems = res.t
        if (this.ReportListitems.length > 0) {
          this.loadCheckReportInfo()
        } else {
          Toast('暂未获取到数据')
        }
        this.showHishroy = true
        this.showHishroys = true
      })
    },
    loadReportLists: function () {
      if (this.data.hospitalName === '' || this.data.hospitalName === null) {
        Toast('请输入医院名称')
        return
      } else if (this.data.name === '' || this.data.name === null) {
        Toast('请输入就诊人姓名')
        return
      }
      checkReportService.loadReportLists(this.data.name, this.data.number, this.data.checknumber, this.data.longTime, this.data.mobile).then(res => {
        this.ReportListitems = res.t
        if (this.ReportListitems.length === 0) {
          Toast('抱歉，没有任何数据')
        }
        if (this.ReportListitems.length > 0) {
          // this.loadCheckReportInfo()
        }
        this.showHishroys = true
        this.showHishroy = true
      })
    },

    dateFormat (date) {
      let oldTime = (new Date(date)).getTime()
      let curTime = helpers.dateFormat(oldTime, 'yyyy-MM-dd')
      return curTime
    }
  }
}
</script>
