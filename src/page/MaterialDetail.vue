<template>
  <div>
    <!--container-->
    <div class="ajc-article">
      <div class="article-box">
        <img src="../assets/article-top.png">
        <div class="article-title">
          <div class="title title-1">{{materialDetail.name}}</div>
          <div class="gray time">{{materialDetail.createDate}}</div>
        </div>
        <div class="article-container" v-html="html_decode(materialDetail.content)">
          
        </div>
      </div>
    </div>
    
    <!--container end-->
  </div>
</template>
<script>
import indexService from 'SERVICES/indexService'
import helpers from 'utils/helpers'
export default {
  data: () => ({
    id: '',
    materialDetail: {}
  }),
  created () {
    this.id = this.$route.query.id
    this.loadMaterialDetail()
  },
  methods: {
    loadMaterialDetail () {
      indexService.loadMaterialDetail(this.id).then(res => {
        this.materialDetail = res.t
      })
    },
    makePhotoUrl: function (url) {
      var photoUrl = url ? helpers.makePhotoUrl(url.replace('|', '')) : ''
      return photoUrl
    },
    html_decode: function (str) {
      return helpers.html_decode(str)
    }
  }
}
</script>
