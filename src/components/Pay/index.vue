<!-- 页面模版 -->
<template>
  <div>
    <!--header-->
    <com-header :titel="headerData.titel" :toLink="headerData.toLink"></com-header>
    <!--payment-box-->
    <div class="payment-box1">
      <div class="pay-header title-1">支付金额：<span class="price red">￥<i class="title-1">{{item.totalamount}}</i></span></div>
      <div class="order-edit-box" style="margin-top:0">
        <div class="item-box hhxh-flex header1">
          <div class="flex-1 gray">请选择支付方式</div>
        </div>
        <div class="item-box" style="padding:0">
          <div class="order-list-box">
            <div class="item-box1 hhxh-flex arrow-right" @click="wechatPay">
              <div class="img-box flex-0"><img src="assets/weixin.png"></div>
              <div class="txt-box flex-1">
                <div class="name title-2 text-overflow1">微信支付</div>
                <div class="price m-top-20">
                  <span class="gray">推荐微信用户使用</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gray payment-remark">备注：支付宝用户请点击右上角浏览器打开</div>
    <!--payment-box-->
    <!--fonter end-->
  </div>
</template>
<script>
import comHeader from 'components/comHeader'
/* import mineOrderService from 'SERVICES/mineOrderService' */
/* import payService from 'SERVICES/payService'
import indexService from 'SERVICES/indexService'
import {Toast} from 'mint-ui' */
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    comHeader
  },
  data: () => ({
    headerData: {
      titel: '支付',
      toLink: ''
    }
  })
/*  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.loadOrder()
  },
  methods: {
    loadOrder: function () {
      mineOrderService.loadOrder(this.$route.params.orderId).then(res => {
        this.item = res.t
      })
    } */
/*    onBridgeReady: function () {
      payService.payment(this.$route.params.orderId, 1).then(rt => {
        this.message = rt.t
        WeixinJSBridge.invoke(
             'getBrandWCPayRequest', {
               'appId': this.message.appId,
               'timeStamp': this.message.timeStamp,
               'nonceStr': this.message.nonceStr,
               'package': this.message.package,
               'signType': this.message.signType,
               'paySign': this.message.paySign
             },
          function (res) {
            console.log(res)
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              Toast('微信支付成功')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              Toast('用户取消支付')
              // window.location.href = 'gift_failview.do?out_trade_no=' + this.orderId
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              Toast('微信支付失败')
              // window.location.href = 'gift_failview.do?out_trade_no=' + this.orderId
            }
          }
        )
      })
    },
    callpay: function () {
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady())
          document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady())
        }
      } else {
        this.onBridgeReady()
      }
    } */
}
</script>
