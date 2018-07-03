import Vue from 'vue'
import Router from 'vue-router'
import hooks from './hooks/'

import Index from 'page/Index'
import Login from 'page/Login'
import Mine from 'page/Mine'
import MineInfo from 'page/MineInfo'
import MineMen from 'page/MineMen'
import MineMenInfo from 'page/MineMenInfo'
import ReportSearch from 'page/ReportSearch'
import MineMenList from 'page/MineMenList'
import HospitalList from 'page/HospitalList'
import MineReportDetail from 'page/MineReportDetail'
import MaterialDetail from 'page/MaterialDetail'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/MaterialDetail',
      name: 'MaterialDetail',
      component: MaterialDetail,
      meta: {
        title: '首页商品详情'
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页'
      }
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine,
      meta: {
        title: '我的',
        needAuth: true
      }
    },
    {
      path: '/MineInfo',
      name: 'MineInfo',
      component: MineInfo,
      meta: {
        title: '个人信息',
        needAuth: true
      }
    },
    {
      path: '/MineMen',
      name: 'MineMen',
      component: MineMen,
      meta: {
        title: '就诊人信息',
        needAuth: true
      }
    },
    {
      path: '/MineMenInfo',
      name: 'MineMenInfo',
      component: MineMenInfo,
      meta: {
        title: '添加就诊人',
        needAuth: true
      }
    },
    {
      path: '/ReportSearch',
      name: 'ReportSearch',
      component: ReportSearch,
      meta: {
        title: '体检报告',
        needAuth: true
      }
    },
    {
      path: '/HospitalList',
      name: 'HospitalList',
      component: HospitalList,
      meta: {
        title: '选择医院',
        needAuth: true
      }
    },

    {
      path: '/MineMenList',
      name: 'MineMenList',
      component: MineMenList,
      meta: {
        title: '选择就诊人',
        needAuth: true
      }
    },
    {
      path: '/MineReportDetail',
      name: 'MineReportDetail',
      component: MineReportDetail,
      meta: {
        title: '体检报告详情',
        needAuth: true
      }
    }
  ]
})

hooks(router)

export default router
