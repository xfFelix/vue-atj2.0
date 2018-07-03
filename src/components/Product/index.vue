<template>
    <div class="item-box hhxh-flex" @click="goInfo(item.id)">
      <div class="img-box flex-0">
       <img :src="makePhotoUrl(item.logo)" class="page-lazyload-image">
        <!-- <div style="width:1.5rem;height:1.5rem;border-radius: .13rem;background-color:blue">
          <img v-lazy="makePhotoUrl(item.logo)" class="page-lazyload-image">
         {{item.logo}}
        </div> -->
      </div>
      <div class="txt-box flex-1">
        <div class="name title-2 text-overflow1" v-html="item.name"></div>
        <div class="price m-top-20" v-if="item.checkPrice !== null ">
          <span class="red price1">￥<i class="title-2">{{item.checkPrice}}</i></span>
          <!-- <span class="original gray">￥{{item.price}}</span> -->
        </div>
        <div class="price m-top-20" v-if="item.checkPrice == 0 ">
          <span class=" price1"><i class="title-2">本地区未开通该套餐</i></span>
          <!-- <span class="original gray">￥{{item.price}}</span> -->
        </div>
      </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import helpers from '../../utils/helpers'

export default {
  props: {
    item: {
      type: Object,
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
<style scoped>
  .page-lazyload-image[lazy=loading] {
    width:100%;
    height:4.66rem;
  }
</style>
