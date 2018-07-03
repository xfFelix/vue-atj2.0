<template>
<div class="product-comment-box">
  <div class="item-box hhxh-flex hhxh-vertical-top"  v-for="item in items">
    <div class="img-box flex-0">
      <!-- <div style="width:1.1rem;height:1.1rem;border-radius: 1.1rem;background-color:blue"></div> -->
       <!-- <img v-lazy="makePhotoUrl(item.member.head)" class="page-lazyload-image"> -->
       <img  src="../../assets/default_user.png">
    </div>
    <div class="txt-box flex-1">
      <div class="hhxh-flex hhxh-justify-content row-1">
        <div class="name">{{item.member.telephone}}</div>
        <div class="time gray">{{item.updateDate}}</div>
      </div>
      <div class="row-2">
        {{item.remark}}
      </div>
    </div>
  </div>
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
      console.info(url)
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      console.info('loading image:' + photoUrl)
      return photoUrl
    }
  }
}
</script>
