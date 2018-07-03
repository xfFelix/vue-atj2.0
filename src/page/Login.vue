<template>
  <div>
    <!--container-->
    <div class="sy-index-header">
      <img src="../assets/logo.png">
    </div>
    <img src="../assets/login-bg.png" style="width: 100%;">
    <div class="login-box">
      <div class="input-row">
        <div class="hhxh-flex">
          <input type="text" class="flex-1" placeholder="手机号码" v-model="mobile">
        </div>
      </div>
      <div class="input-row">
        <div class="hhxh-flex">
          <input type="text" class="flex-1" placeholder="验证码" v-model="code">
          <button class="active-btn" :class="{'active' : count !==0}" @click="doGetCode">{{count ===0 ? '获取验证码':count + 's'}}</button>
        </div>
      </div>
      <div class="input-row" style="margin-top: .6rem;">
        <div class="hhxh-flex">
          <button class="active-btn title-0" @click="doLogin">登录</button>
        </div>
      </div>
    </div>
    <!--container end-->

    <!-- <end-footer></end-footer> -->
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import loginService from 'services/loginService'
import validators from '../utils/validators'
import Toast from 'mint-ui'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    mobile: '',
    code: '',
    count: 0,
    openId: '',
    isZZ: '',
    number: ''
  }),
  created () {
    this.number = this.$route.query.number
  },
  methods: {
    doGetCode: function () {
      this.code = ''
      if (this.count === 0) {
        if (this.mobile.trim() === '') {
          Toast('请输入手机号')
          return
        } else if (!validators.mobile(this.mobile)) {
          this.mobile = ''
          Toast('手机号不正确')
          return
        } else {
          this.countDown(60)
          loginService.sendSms(this.mobile).then(res => {
            Toast(res.msg)
          })
        }
      }
    },
    doLogin: function () {
      if (this.mobile.trim() === '') {
        Toast('请输入手机号')
        return
      } else if (!validators.mobile(this.mobile)) {
        this.mobile = ''
        Toast('手机号不正确')
        return
      } else if (this.code.trim === '') {
        Toast('请输入验证码')
        return
      } else {
       // this.number = sessionStorage.getItem('number')
        loginService.memberLogin(this.mobile, this.code, this.number).then(res => {
          this.isZZ = res.t.isZZ
          if (this.isZZ === '1') {
            this.$root.userDate = res.t
            localStorage.setItem('userDate', JSON.stringify(res.t.member))
            localStorage.setItem('accessToken', res.t.token)
            localStorage.setItem('accessTokenTime', new Date().getTime())
            localStorage.setItem('isOut', false)
            // Toast(res.msg)
            // this.$router.push('/Mine')
            let { redirect } = this.$route.query
            redirect = redirect ? decodeURIComponent(redirect) : '/'
            this.$router.replace({ path: redirect, force: true })
            // Toast('您购物车中有未处理的优惠体检套餐，请及时处理!')
          } else {
            this.$root.userDate = res.t
            localStorage.setItem('userDate', JSON.stringify(res.t.member))
            localStorage.setItem('accessToken', res.t.token)
            localStorage.setItem('accessTokenTime', new Date().getTime())
            localStorage.setItem('isOut', false)
            // Toast(res.msg)
            // this.$router.push('/Mine')
            let { redirect } = this.$route.query
            redirect = redirect ? decodeURIComponent(redirect) : '/'
            this.$router.replace({ path: redirect, force: true })
          }
          // console.info(res)
          // window._global = res.t
        })
      }
    },
    countDown: function (val) {
      setTimeout(() => {
        val -= 1
        this.count = val
        // console.info(val)
        if (val > 0) {
          this.countDown(val)
        }
      }, 1000)
    }
  }
}
</script>
