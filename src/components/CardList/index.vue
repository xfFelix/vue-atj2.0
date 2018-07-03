<template>
  <div class="list-box-items clearbox">
    <div class="item hhxh-left  box-sizing" v-for="item in items" @click="goInfo(item.id)">
        <!-- <div class="img-box" style="background-color:#dedeef;"> -->
          <img v-lazy="makePhotoUrl(item.logo)" class="img-box">
        <!-- </div> -->
        <div class="txt-box">
            <div class="text-overflow title title-2">{{item.name}}</div>
            <div class="text-overflow descri title-2 m-top-10 gray">{{item.abstractDesc}}</div>
            <div class="price hhxh-flex hhxh-vertical-top hhxh-justify-content m-top-25">
              <div>
                <!-- <div class="original-price">￥{{item.price}}</div> -->
                <div><span class="red price1">￥<i class="title-2">{{item.checkPrice}}</i></span></div>
              </div>
              <div class="gray">已售{{item.salesCount}}份</div>
            </div>
          </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import helpers from '../../utils/helpers'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    goInfo: function (id) {
      id !== '' ? this.$router.push({name: 'ProductInfo', params: {productId: id}}) : Toast('产品id为空')
    },
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      // console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>
