// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import router from './router'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
// 引用API文件
// import api from './api/api'
// 将API方法绑定到全局
// Vue.prototype.$api = api
// 开启vue debug模式
Vue.config.debug = true
Vue.use(VueResource)
Vue.use(Mint)
window.moment = require('moment')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
