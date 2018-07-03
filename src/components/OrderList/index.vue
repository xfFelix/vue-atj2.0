<template>
  <!--list-box-->
    <div class="order-edit-box mine-order-status"
      v-for="item in items"><!-- order-status-unsubmit -->
      <div class="status-box "
      :class="{
              unsubmit:item.status === '1',
              completed:item.status === '50',
              cancel:item.status === '5',
              unpaid:item.status === '10',
              visit:item.status === '30',
              paid:item.status === '20',
              paid:item.status === '28',
              test:item.status === '40',
              refunded:item.status === '100',
              refunding:item.status === '90'}"
      @click="goInfo(item)">
               <!-- 1-待提交 5-已取消 10-未付款，20已付款，30-上门，40-检验，50-完成，90-退款中，100-已退款 -->
      </div>
      <div class="item-box hhxh-flex" @click="goInfo(item)">
        <div class="flex-0 title-2">{{item.name || '未填写'}} - {{item.number}}</div>
        <div class="flex-1 text-right gray">{{item.orderTime}}</div>
      </div>
      <div class="item-box" @click="goInfo(item)">
        <div class="order-list-box">
          <div class="item-box1 hhxh-flex" v-for="product in item.orderProductList">
            <div class="img-box flex-0"><!-- <div style="width:1.5rem;height:1.5rem;border-radius: .13rem;background-color:blue"></div> -->
              <img v-lazy="makePhotoUrl(product.logo)">
            </div>
            <div class="txt-box flex-1">
              <div class="name title-2 text-overflow1">{{product.name}}</div>
              <div class="price m-top-20">
                <span class="red price1">￥<i class="title-2">{{product.price}}</i></span>
                <!-- <span class="original">￥<i class="title-2">80</i></span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-box hhxh-flex">
        <div class="red text-right flex-1">总计：<span class="price price1">￥<i class="title-2">{{item.totalamount}}</i></span></div>
        <div class="flex-0 mine-order-btns">
          <button class="blue" v-if="item.status === '1'" @click="goInfo(item)">填写订单</button>
          <button class="gray" v-if="item.status === '50'" @click="goComment(item)">去评价</button>
          <button class="blue" v-if="item.status === '50'" @click="goReport(item)">查看报告</button>
           <button class="gray" v-if="item.status === '5' || item.status === '1'" @click="deleteOrder(item)">删除</button>
          <button class="gray" v-if="item.status === '10'" @click="doCancel(item)">取消</button>
          <button class="blue-bg" v-if="item.status === '10'" @click="goPay(item)">去支付</button>
          <button class="red" v-if="item.status === '20' || item.status === '28'" @click="showRefundPop(item)">退款</button>
          <button class="gray" v-if="item.status === '90' || item.status === '100'" @click="goRefund(item)">查看退款详情</button>
        </div>
      </div>
    </div>
  <!--container end-->
</template>
<script>
import product from 'components/product'

export default {
  components: {
    product
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
