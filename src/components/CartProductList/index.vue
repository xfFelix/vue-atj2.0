<template>
<div>
  <div class="order-list-box mine-cart-box">
    <div class="item-box1 hhxh-flex" v-for="item in items"
    :class="{ disabled: item.issales !== '1' }">
      <div class="flex-0 checkbox ajc-checkbox" >
        <input type="checkbox"
        @click="sendCheck"
        v-model="item.checked"
        :disabled="item.issales !== '1'">
          <span></span>
      </div>
      <div class="img-box flex-0" ><!--   @click="goInfo(item.checkPackageId,item.issales)" -->
        <!-- <div style="width:1.5rem;height:1.5rem;border-radius: .13rem;background-color:blue"></div> -->
        <img v-lazy="makePhotoUrl(item.logo)">
      </div>
      <div class="txt-box flex-1" ><!-- @click="goInfo(item.checkPackageId,item.issales)" -->
        <div class="name title-2 text-overflow1">{{item.name}}</div>
        <div class="price m-top-20 clearbox">
          <span class="red price1">￥<i class="title-2">{{item.itemPrice}}</i></span>
          <!-- <span class="original">￥{{item.price}}</span> -->
        </div>
      </div>
      <div class="flex-0" @click="item.checked = false;sendCheck();doDelete(item.id)">
        <div class="gray text-center">{{item.issales !== '1' ? '已下架' : ''}}</div>
        <button class="del-btn m-top-20">删除</button>
      </div>
    </div>
  </div>
  <!-- <div class="order-list-box mine-cart-box" @click="goIndex()">
      <div class="item-box1 hhxh-flex">
        <div class="hhxh-flex hhxh-justify-center" style="width: 100%">
          <img src="../../assets/add-more.png" style="height: 20px;">
          <div >&nbsp;&nbsp;添加更多项目</div>
        </div>
      </div>
    </div> -->
 </div>
</template>

<script>
import helpers from '../../utils/helpers'
import mineCartService from '../../SERVICES/mineCartService'
import { Toast, MessageBox } from 'mint-ui'
import $bus from '../../utils/bus'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    id: 0
  }),
  methods: {
    doDelete: function (id) {
      MessageBox({
        title: '提示',
        message: '确认删除该商品吗?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          mineCartService.deleteCar(id).then(res => {
            // console.info(JSON.stringify(res))
            Toast(res.msg)
            // console.info('通知购物车父组建需要刷新列表页面')
            $bus.$emit('REFRESHCAR', true)
          })
        }
      })
    },
    goIndex: function () {
      this.$router.push('/')
    },
    sendCheck: function () {
      // 推送数据到父组件
      this.$emit('SENDCHECK', this.getChecked())
    },
    getChecked: function () {
      return this.items.filter(item => item.checked)
      // .map(item => item.id)
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    goInfo: function (id, issales) {
      if (issales === '1') {
        id !== '' ? this.$router.push({name: 'ProductInfo', params: {productId: id}}) : Toast('产品id为空')
      } else {
        Toast('该产品已下架，无法查看详情')
      }
    }
  }
}
</script>
