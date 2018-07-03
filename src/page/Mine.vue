<template>
  <div>
    <!--container-->
    <div class="mine-info">
      <img src="../assets/default-user.png">
      <div class="txt-name white text-center">{{userData.telephone}}</div>
    </div>
    <div class="mine-nav-box clearbox">
      <div class="item-box">
        <img src="../assets/mine-info.png" @click="goMineInfo()" class="img-box">
        <div class="txt-name">账户信息</div>
      </div>
      <div class="item-box">
        <img src="../assets/mine-men.png" @click="goMineMen()" class="img-box">
        <div class="txt-name">就诊人信息</div>
      </div>
      <div class="item-box">
        <img src="../assets/mine-order.png" class="img-box">
        <div class="txt-name">我的订单</div>
      </div>
      <div class="item-box">
        <img src="../assets/mine-cart.png" class="img-box">
        <div class="txt-name">购物车</div>
      </div>
      <div class="item-box">
        <img src="../assets/mine-report.png" @click="goReportSearch()" class="img-box">
        <div class="txt-name">检查报告</div>
      </div>
      <div class="item-box">
        <img src="../assets/mine-code.png" class="img-box">
        <div class="txt-name">我的二维码</div>
      </div>
    </div>

    <div class="mine-info-submit text-center">
      <button class="active-btn logout" @click="loginOut">退出</button>
    </div>
    <!--container end-->

    <end-footer :point="point"></end-footer>
  </div>
</template>
<script>
import EndFooter from 'components/EndFooter'
import {MessageBox} from 'mint-ui'
import helpers from '../utils/helpers'
// import indexService from 'SERVICES/indexService'
import loginService from 'SERVICES/loginService'
export default {
  components: {
    EndFooter
  },
  data: () => ({
    point: 2,
    headerData: {
      titel: '我的',
      toLink: '/'
    },
    isOut: true,
    isshowpage: false,
    userData: JSON.parse(localStorage.getItem('userDate')) || {telephone: ''},
    isfirst: ''
  }),
  created () {

  },
  beforeRouteEnter (to, from, next) {
    sessionStorage.clear()
    next()
  },
  methods: {
    goMineInfo () {
      this.$router.push({
        name: 'MineInfo'
      })
    },
    goMineMen () {
      this.$router.push({
        name: 'MineMen'
      })
    },
    goReportSearch () {
      this.$router.push({
        name: 'ReportSearch'
      })
    },
    goIndex: function () {
      if (helpers.isLogin()) {
        this.$router.push('/')
      } else {
        MessageBox({
          title: '提示',
          message: '您尚未登录，是否前往登录?',
          showCancelButton: true
        }).then(res => {
          if (res !== 'cancel') {
            this.$router.push({
              path: '/login',
              query: {redirect: this.$router.currentRoute.fullPath}
            })
          }
        })
      }
    },
    /* isfirstcheckLogin: function () {
      this.isfirst = sessionStorage.getItem('isfirst')
      if (this.isfirst === '' || this.isfirst === null || this.isfirst === 'null') {
        this.checkLogin()
        this.isfirst = true
        alert('01')
        sessionStorage.setItem('isfirst', this.isfirst)
      }
    }, */
    checkLogin: function () {
      const isF = localStorage.getItem('isF')
      if (isF === false) {
        alert('02')
        localStorage.clear()
        isF === true
        localStorage.setItem('isF', isF)
      }
     // this.checkClear()
      /**
       * 获取url后面的参数
       */
      function getViewParam () {
        var args = {}
        var query = location.search.substring(1)
        var pairs = query.split('&')
        for (var i = 0; i < pairs.length; i += 1) {
          var pos = pairs[i].indexOf('=')
          if (pos === -1) {
            continue
          }
          var argname = pairs[i].substring(0, pos)
          var value = pairs[i].substring(pos + 1)
          args[argname] = unescape(value)
        }
        return args
      }
      const url = window.location.href
      const code = getViewParam().code
      // alert('调试信息--code-->' + code)
      // 判读是否有code,有就重后台获取access_Token,没有就重新获取code
      // code = '011LLs0M08hF462PNFZL0vHE0M0LLs0B'
      if (code) {
        loginService.getAccessToken(code).then(res => {
          if (res.t) {
            if (res.t.isLogin === true) {
              // iso端有版本会将后台传的布尔值改为字符串
              console.info('自动登录成功')
              this.$root.userDate = res.t
              localStorage.setItem('openId', res.t.openId)
              this.$router.replace({ path: '/', force: true })
              // console.info('winUrl===>' + url)
              // window.top.location.href = url.substring(0, url.indexOf('?'))
            } else if (res.t.isLogin === false) {
              localStorage.setItem('openId', res.t.openId)
              // 自动登录失败 说明没有绑定过openId
              console.info('自动登录失败 说明没有绑定过openId===>' + res.t.openId)
              if (res.t.openId && res.t.openId !== 'null') {
                localStorage.setItem('openId', res.t.openId)
              } else {
                var redirectUri = encodeURIComponent(url)
        // var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f6299cbe47ce4a2&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
                var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdda6aeaa0e8b932f&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
                window.top.location.href = uri
              }
            }
          }
        })
      } else {
        var redirectUri = encodeURIComponent(url)
        // var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f6299cbe47ce4a2&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
        var uri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdda6aeaa0e8b932f&redirect_uri=' + redirectUri + '&response_type=code&Scope=snsapi_userinfo&state=abc#wechat_redirect'
        window.top.location.href = uri
      }
    },
    goCart: function () {
      this.$router.push('MineCart')
    },
    goOrder: function () {
      this.$router.push('MineOrder')
    },
    goMen: function () {
      this.$router.push('MineMen')
    },
    recommendFriends: function () {
      this.isshowpage = true
     /* mineInfoService.recommendFriend().then(res => {
        this.image = res.t
        this.isInfo = true
      }) */
    },
    chosePage: function () {
      this.isshowpage = false
    },
    loginOut: function () {
      MessageBox({
        title: '提示',
        message: '是否退出登录?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          this.telephone = this.userData.telephone
          loginService.memberOut(this.telephone).then(res => {
            if (res.code === 200) {
              // const openId = localStorage.getItem('openId')
              localStorage.clear()
             // localStorage.setItem('openId', openId)
              localStorage.setItem('isOut', true)
              this.$router.push('/Login')
            }
          })
   /*       const openId = localStorage.getItem('openId')
          alert(openId + '退出')
          localStorage.clear()
          localStorage.setItem('isOut', true)
          localStorage.setItem('openId', openId)
          alert(localStorage.getItem('openId') + '保存') */
        }
      })
    },
    changeShows: function () {
      if (helpers.isLogin()) {
        if (this.isshow === true) {
          this.isshow = false
        } else {
          this.isshow = true
        }
      } else {
        MessageBox({
          title: '提示',
          message: '您尚未登录，是否前往登录?',
          showCancelButton: true
        }).then(res => {
          if (res !== 'cancel') {
            this.$router.push({
              path: '/login',
              query: {redirect: this.$router.currentRoute.fullPath}
            })
          }
        })
      }
    },
/*    loadJsConfig: function () {
      indexService.loadJsConfig(location.href.split('#')[0]).then(res => {
        // console.group(res)
        wx.config({
          debug: false,
          appId: res.t.appId,
          timestamp: res.t.timestamp,
          nonceStr: res.t.nonceStr,
          signature: res.t.signature,
          jsApiList: ['getLocation',
            'checkJsApi']
        })
      })
    },
    doWxjsPai: function () {
      let _this = this
      wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.checkJsApi({
          jsApiList: [
            'getLocation'
          ],
          success: function (res) {
            // alert(JSON.stringify(res));
            // alert(JSON.stringify(res.checkResult.getLocation));
            if (res.checkResult.getLocation === false) {
              alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！')
              return
            } else {
              const defaultCityItem = sessionStorage.getItem('defaultCity')
              if (defaultCityItem) {
                // 说明选择了城市
                return
              }
              const addressItem = sessionStorage.getItem('addressItem')
              if (!addressItem) {
                wx.getLocation({
                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function (res) {
                    var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed // 速度，以米/每秒计
                    // var accuracy = res.accuracy // 位置精度
                    var geocoder = new window.qq.maps.Geocoder({
                      complete: function (result) {
                        // 缓存地址数据
                        sessionStorage.setItem('addressItem', JSON.stringify(result))
                        _this.setLocaltion2(_this, result)
                      }
                    })
                    var latLng = new window.qq.maps.LatLng(latitude, longitude)
                    geocoder.getAddress(latLng)
                  },
                  cancel: function (res) {
                    alert('用户拒绝授权获取地理位置')
                  }
                })
              }
            }
          }
        })
      })
      wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.error(res)
      })
    },
     /**
     * 判断是否需要自动登录
     * 微信端进入且退出登录了
     *
     */

  /*  loginOut: function () {
      MessageBox({
        title: '提示',
        message: '是否退出登录?',
        showCancelButton: true
      }).then(res => {
        if (res !== 'cancel') {
          this.mobile = this.userData.mobile
          loginService.memberOut(this.mobile).then(res => {
            this.code = res.code
            if (this.code === 200) {
              console.log(this.mobile)
              const openId = localStorage.getItem('openId')
              localStorage.clear()
              localStorage.setItem('isOut', true)
              localStorage.setItem('openId', openId)
              this.$router.push('Login')
            }
          })
        }
      })
    }, */
    getHeadUrl: function (head) {
      return head || `../assets/default_user.png`
    },
    goMineReport: function () {
      this.$router.push('MineReport')
    }
  }
}
</script>
