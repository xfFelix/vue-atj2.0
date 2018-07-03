<template>
    <div class="swipe-box" id="swipe-box">
        <mt-swipe :auto="4000" v-if="items.length>0">
          <!-- 小人图片 -->
          <!-- <img src="../../assets/kt-men.png" class="kt-pic"> -->
          <mt-swipe-item v-for="item in items">
            <!-- <router-link :to="{name:'SwipeInfo',params: {id:item.id}}" v-if="item.type===2">
              <img  :src="makePhotoUrl(item.picture)" class="page-lazyload-image">
            </router-link>v-lazy="item.imgUrl"
            <a :href="item.url" target="_blank" v-if="item.type===1">
              <img :src="makePhotoUrl(item.picture)" class="page-lazyload-image">
            </a> -->
            <div style="height: 100%;width: 100%;overflow: hidden;">
              <img style="width: 100%;" :src="makePhotoUrl(item.picture)" class="page-lazyload-image">
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <!-- <img src="../../assets/banner_default.png" class="page-lazyload-image"  v-if="items.length <= 0"> -->
    </div>
</template>
<script>
import helpers from '../../utils/helpers'
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    makePhotoUrl: function (url) {
      // 返回的数据中 多了‘|’ 所以去除
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      // console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>
<style scoped>
  .page-lazyload-image{
    width: 100%;
    height: 100%;
  }
  .page-lazyload-image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto
}
</style>
