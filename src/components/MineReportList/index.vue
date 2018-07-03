<template>
  <div>
    <!--header-->
   <!--  <com-header :titel="headerData.titel" :toLink="headerData.toLink"></com-header> -->
    <!--header end-->
    <!--container-->
    <div class="mine-test-box" v-for="item in items" @click="goInfos(item.id,item.flag)" >
      <div class="hhxh-flex">
        <div class="flex-1 title-2">{{item.number}}</div>
        <div class="flex-1 text-right">{{item.orderTime}}</div>
      </div>
      <div class="hhxh-flex m-top-20">
        <div class="flex-1 text-overflow product">{{item.name}}</div>
        <div class="flex-0 text-right" v-if="item.flag === '1'"><span class="report">报告已寄出</span></div>
        <div class="flex-0 text-right" v-if="item.flag === '0'"><span class="report no">报告未寄出</span></div>
      </div>
    </div>
    <!--container end-->
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import comHeader from 'components/comHeader'

export default {
  components: {
    comHeader
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    headerData: {
      titel: '体检报告',
      toLink: '/Mine'
    }
  }),
  methods: {
    goInfos: function (id, flag) {
      if (flag !== '1') {
        Toast('报告未寄出')
      } else {
        id !== '' ? this.$router.push({name: 'MineReportDetailByOrderId', params: {MineReportDetailId: id}}) : Toast('订单id为空')
      }
    }
  }
}
</script>
