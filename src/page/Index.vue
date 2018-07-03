<template>
  <div>
    <!--container-->
    <div class="sy-index-header">
      <img src="../assets/logo.png">
    </div>
    <!-- 轮播图 -->
    <swipe :items="swipeItems"></swipe>
    <!-- 轮播图结束 -->
    <div class="sy-nav-box">
      <div class="hhxh-flex">
        <div class="flex-1">
          <img src="../assets/sy-ckbg.png" class="img-box" @click="goReportSearch">
          <div class="txt-name">查看报告</div>
        </div>
        <div class="flex-1">
          <img src="../assets/sy-jkgl.png" class="img-box">
          <div class="txt-name">健康管理</div>
        </div>
        <div class="flex-1">
          <img src="../assets/sy-ddgl.png" class="img-box">
          <div class="txt-name">订单管理</div>
        </div>
      </div>
    </div>
    <!-- 热销商品列表 -->
    <div class="sy-news-box">

      <div class="item-box active-btn" v-for="(item, index) in materialList" @click="goMaterialDetail(item.id)">
        <div class="hhxh-flex">
          <div class="flex-0"><img :src="makePhotoUrl(item.picture)"></div>
          <div class="flex-1">
            <h1 class="text-overflow1">{{item.name}}</h1>
            <p class="text-overflow2 m-t-15 title-small">{{item.description}}</p>
          </div>
        </div>
      </div>
      
    </div>
    <!--container end-->

    <end-footer :point="point"></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import indexService from 'services/indexService'
import Swipe from 'components/Swipe'
import helpers from 'utils/helpers'
export default {
  components: {
    EndFooter,
    Swipe
  },
  data: () => ({
    swipeItems: [],
    point: 1,
    materialList: []
  }),
  created () {
    this.loadSwipeItems()
    this.loadMaterialList()
  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.clear()
    next()
  },
  methods: {
    loadSwipeItems: function (params) {
      indexService.loadSwipeItems().then(res => {
        this.swipeItems = res.t
      })
    },
    loadMaterialList () {
      indexService.loadMaterialList().then(res => {
        this.materialList = res.t
      })
    },
    goReportSearch () {
      this.$router.push({
        name: 'ReportSearch'
      })
    },
    goMaterialDetail (id) {
      this.$router.push({
        name: 'MaterialDetail',
        query: {
          id: id
        }
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    }
  }
}
</script>
