<template>
  <div>
    <!--container-->
    <div class="mine-men-container">

      <div class="item-box active-btn" v-for="(item,index) in patientitems" @click="goReportSearch(item.id, item.name, item.telephone, index)">
        <div class="hhxh-flex">
          <div class="flex-1">
            <div>{{item.name}}&nbsp;&nbsp;&nbsp;{{item.gender==='1'?'男':(item.gender==='2'?'女':'')}}&nbsp;&nbsp;&nbsp;{{item.telephone}}</div>
            <!-- <div class="m-t-15 text-overflow1 title-small">广州省深圳市南山区类似京东菲利克斯决定了</div> -->
          </div>
          <img src="../assets/select.png" style="width: .64rem;" v-if="index == aimPerson">
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
import mineMenService from 'services/mineMenService'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    patientitems: [],
    aimPerson: 0
  }),
  created () {
    this.loadPatientlist()
    this.aimPerson = JSON.parse(sessionStorage.aimPerson)
  },
  methods: {
    loadPatientlist: function () {
      mineMenService.loadPatientlist().then(res => {
        this.patientitems = res.t
      })
    },
    goReportSearch (id, name, mobile, index) {
      let data = JSON.parse(sessionStorage.data)
      data.name = name
      data.mobile = mobile
      sessionStorage.setItem('aimPerson', JSON.stringify(index))
      sessionStorage.setItem('data', JSON.stringify(data))
      this.$router.replace({
        name: 'ReportSearch'
      })
    }
  }
}
</script>
