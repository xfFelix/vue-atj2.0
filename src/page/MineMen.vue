<template>
  <div>
    <!--container-->
    <div class="mine-men-container">
      
      <div class="item-box" v-for="(item, index) in items" @click="goEdit(item.id)">
        <div class="hhxh-flex">
          <div class="flex-1">{{item.name}}&nbsp;&nbsp;&nbsp;{{item.gender==='1'?'男':(item.gender==='2'?'女':'')}}&nbsp;&nbsp;&nbsp;{{item.telephone}}</div>
          <img src="../assets/edit.png" class="flex-0 m-l-20" >
          <div class="flex-0 m-l-20" @click="goEdit(item.id)">编辑</div>
        </div>
        <div class="hhxh-flex m-t-15">
          <div class="flex-1 text-overflow1">{{item.area.name}}&nbsp;&nbsp;{{item.address}}</div>
          <img src="../assets/delete.png" class="flex-0 m-l-20">
          <div class="flex-0 m-l-20" @click.stop="deletePatient(item.id, index)">删除</div>
        </div>
      </div>

    </div>

    <div class="mine-info-submit text-center">
      <button class="active-btn" @click="goAdd"><img src="../assets/add-.png" style="height: .7rem;"></button>
    </div>
    <no-data :items="items || []"></no-data>
    
    <!--container end-->

    <end-footer></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import noData from 'components/noData'
import mineMenService from 'SERVICES/mineMenService'
import helpers from '../utils/helpers'
import {Toast, MessageBox} from 'mint-ui'
export default {
  components: {
    EndFooter,
    noData
  },
  data: () => ({
    headerData: {
      titel: '就诊人管理',
      toLink: ''
    },
    checkData: {
      id: ''
    },
    items: []
  }),
  created () {
    this.initHead()
    this.loadPatientlist()
  },
  methods: {
    goAdd () {
      this.$router.push({
        name: 'MineMenInfo'
      })
    },
    initHead: function () {
      this.headerData.toLink = helpers.initHead(this.$route)
    },
    loadPatientlist: function () {
      mineMenService.loadPatientlist().then(res => {
        this.items = res.t
      })
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    },
    goEdit: function (id) {
      id !== '' ? this.$router.push({name: 'MineMenInfo', params: {PatientId: id}}) : Toast('就诊人id为空')
    },
    deletePatient: function (id, index) {
      MessageBox({
        title: '提示',
        message: '确认删除该就诊人信息吗?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          mineMenService.deletePatient(id).then(res => {
            this.items.splice(index, 1)
          })
        }
      })
    }
  }
}
</script>
