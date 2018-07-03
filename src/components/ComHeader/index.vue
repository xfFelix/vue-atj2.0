<template>
  <div>
    <!--header-->
    <header class="header hhxh-flex">
      <div class="flex-0 left-box" @click="goHistory">
        <!-- <router-link :to="toLink">
          <img src="../../assets/left-white-icon.png">
        </router-link> -->
        <img src="../../assets/left-white-icon.png">
      </div>
      <div class="flex-1 text-overflow text-center title-1">{{titel}}</div>
      <div class="flex-0 right-box"></div>
    </header>
    <div class="header-empty"></div>
    <!--header end-->
  </div>
</template>
<script>
  export default {
    props: {
      titel: {
        type: String,
        required: true
      },
      toLink: {
        type: String
      }
    },
    methods: {
      // 返回上一页
      goHistory: function () {
        // const fullPath = this.$router.currentRoute.fullPath
        // console.info('fullPath====>' + fullPath)
        // let { redirect } = this.$route.query
        // if (redirect) {
        //   this.$router.push(decodeURIComponent(redirect))
        // } else {
        this.toLink !== '' ? this.$router.push(this.toLink) : this.$router.go(-1)
        // }
      }
    }
  }
</script>
