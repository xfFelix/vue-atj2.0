<template>
  <div>
    <!--container-->
    <div class="mine-men-container">

      <div class="item-box active-btn" v-for="(item,index) in hospitals" @click="goReportSearch(item.name, item.number, index)">
        <div class="hhxh-flex">
          <div class="flex-1">
            <div>{{item.name}}&nbsp;&nbsp;&nbsp;{{item.number}}</div>
            <!-- <div class="m-t-15 text-overflow1 title-small">广州省深圳市南山区类似京东菲利克斯决定了</div> -->
          </div>
          <img src="../assets/select.png" style="width: .64rem;" v-if="index == aimHospital">
        </div>
      </div>
      
    </div>
    <!-- <div class="mine-info-submit text-center">
      <button class="active-btn">管理</button>
    </div> -->
    <!--container end-->

    <end-footer></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import checkReportService from 'services/checkReportService'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    hospitals: [],
    aimHospital: 0
  }),
  created () {
    this.loadHospitalList()
    this.aimHospital = JSON.parse(sessionStorage.aimHospital)
  },
  methods: {
    loadHospitalList: function () {
      checkReportService.loadHospitalList().then(res => {
        this.hospitals = res.t
      })
    },
    goReportSearch (name, number, index) {
      let data = JSON.parse(sessionStorage.data)
      data.number = number
      data.hospitalName = name
      sessionStorage.setItem('aimHospital', JSON.stringify(index))
      sessionStorage.setItem('data', JSON.stringify(data))
      this.$router.replace({
        name: 'ReportSearch'
      })
    }
  }
}
</script>
