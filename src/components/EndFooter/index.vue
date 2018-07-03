<template>
  <div>
    <!--footer-->
    <div class="footer-empty"></div>
    <div class="footer-box">
      <div class="hhxh-flex">
        <div class="flex-1 active-btn" :class="{active: point == 1}" @click="goIndex()"><img src="../../assets/footer-home.png">首页</div>
        <div class="flex-1 active-btn" :class="{active: point == 2}" @click="goMine()"><img src="../../assets/footer-mine.png">我的</div>
        <div class="flex-1 active-btn"><img src="../../assets/footer-more.png">更多</div>
      </div>
    </div>
    <!--fonter end-->
  </div>
</template>
<script>
export default {
  props: {
    point: {
      type: Number
    }
  },
  created () {

  },
  methods: {
    goIndex () {
      this.$router.push({
        name: 'Index'
      })
    },
    goMine () {
      this.$router.push({
        name: 'Mine'
      })
    }
  }
}
</script>
