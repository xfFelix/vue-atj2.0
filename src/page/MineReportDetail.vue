<template>
  <div>
    <!--container-->
    <div class="mine-info mine-report-user">
      <img src="../assets/default-user.png">
      <div class="txt-name white text-center">{{reportMain.patName}}</div>
      <div class="txt-name white text-center">{{reportMain.tel}}</div>
    </div>
    <div class="mine-report-h2 text-center">完整报告</div>
    <div class="mine-report-detail-box" v-for="(sitem, indexs) in reportList">
      <div class="row-box">
        <div class="hhxh-flex">
          <div class="flex-0">{{sitem.gitemna}}</div>
          <div class="flex-1 m-l-20 text-center text-overflow1">{{sitem.barCode}}</div>
        </div>
      </div>
      <div class="row-box" v-for="(reitem, index) in sitem.list" :class="checkColor(reitem.result, reitem.referenceRange)">
        <div class="hhxh-flex">
          <div class="flex-1">
            <div class="hhxh-flex">
              <div class="flex-0 txt-name1 gray">简称</div>
              <div class="flex-0 txt-value1 m-l-20">{{reitem.groupitemNumber}}</div>
              <div class="flex-0 txt-name1 gray m-l-20">名称</div>
              <div class="flex-1 m-l-20 text-overflow1">{{reitem.groupitemName}}</div>
            </div>
            <div class="hhxh-flex m-t-25">
              <div class="flex-0 txt-name1 gray">数值</div>
              <div class="flex-0 txt-value1 m-l-20">{{reitem.result}}</div>
              <div class="flex-0 txt-name1 gray m-l-20">范围</div>
              <div class="flex-1 m-l-20 text-overflow1">{{reitem.referenceRange}}/L</div>
            </div>
          </div>
          <div class="flex-0 m-l-20">
            <img src="../assets/report-question.png" @click="checkPopVisible(reitem.referenceRange, indexs, index, reitem.clinical)">
          </div>
        </div>
          <!-- 详情弹出窗 -->
          <div v-if="points === indexs && point === index && popVisible == true">
            <div class="explain-box">
              <div class="hhxh-flex">
                <div class="flex-0 gray">参照范围</div>
                <div class="m-l-20">{{referenceRange}}/L</div>
              </div>
              <div class="hhxh-flex m-t-25 hhxh-vertical-top">
                <div class="flex-0 gray">临床意义</div>
                <div class="m-l-20 descri">{{clinical}}</div>
              </div>
            </div>
            <div class="mask1-box" @click="cancelPopVisible"></div>
          </div>
          <!-- 详情弹出窗结束 -->
      </div>
    </div>
    <!--container end-->

    <end-footer></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import checkReportService from 'SERVICES/checkReportService'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    popVisible: false,
    headerData: {
      titel: '报告详情',
      toLink: ''
    },
    isshows: '',
    age: '',
    gender: '',
    hosname: '',
    isShow: '',
    products: [],
    isSuggestShow: '',
    reportMain: {},
    reportList: [],
    bdHospital: {},
    referenceRange: '',
    clinical: '',
    points: 0,
    point: 0
  }),
  created () {
    this.loadCheckReport()
  },
  methods: {
    checkPopVisible (referenceRange, indexs, index, clinical) {
      this.referenceRange = referenceRange
      this.points = indexs
      this.point = index
      this.clinical = clinical
      this.popVisible = true
    },
    cancelPopVisible () {
      this.popVisible = false
    },
    change1: function (sitem) {
      if (this.isShow === sitem.id) {
        this.isShow = ''
      } else {
        this.isShow = sitem.id
      }
    },
    change2: function (reitem) {
      console.log(reitem.id)
      if (this.isSuggestShow === reitem.id) {
        this.isSuggestShow = ''
      } else {
        this.isSuggestShow = reitem.id
      }
    },
    changeShow: function (reitem) {
      if (this.isshows === reitem.id) {
        this.isshows = ''
      } else {
        this.isshows = reitem.id
      }
    },
    checkColor (number, range) {
      var num = Number(number)
      var index = range.indexOf('-') === -1 ? '～' : '-'
      if (range !== '') {
        let min = Number(range.split(index)[0])
        let max = Number(range.split(index)[1])
        if (num < min) {
          return 'blue'
        } else if (num > max) {
          return 'red'
        }
      }
    },
    loadCheckReport: function () {
      checkReportService.loadCheckHospitalReport(this.$route.query.MineHospitalReportDetailId).then(res => {
        this.reportList = res.t.list
        this.reportMain = res.t.reportMain
        this.bdHospital = res.t.bdHospital
      })
    }
  }
}
</script>
