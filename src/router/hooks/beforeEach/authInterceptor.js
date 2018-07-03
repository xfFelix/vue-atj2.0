// import router from 'ROUTE/' // 为避免循环依赖，改用如下传入的方式
// import {Toast} from 'mint-ui'
import helpers from '../../../utils/helpers'

// 权限拦截
const authInterceptor = (to, from, next) => {
  // needAuth：需要登录后访问；forbidAuthed：禁止登录后访问
  const { needAuth } = to.meta
  // console.info('尝试访问：' + to.path)
  // console.info('是否需要登录后访问：' + Boolean(needAuth))
  // console.info('是否禁止登录后访问：' + Boolean(forbidAuthed))
  // && (Math.floor((new Date().getTime() - accessTokenTime) / 3600000) > 9)
  if (needAuth && !helpers.isLogin()) {
    // Toast('访问该页面需要登录权限')
    // return redirect({
    //   path: `/login?referrer=${encodeURIComponent(path)}`,
    //   force: true // 禁用追加模式
    // })
    next({
      path: '/Login',
      query: {redirect: to.path}
    })
  }

  // if (forbidAuthed && userData) {
  //   $.toast({
  //     heading: '您已登录，禁止访问该页面',
  //     text: '已中断跳转',
  //     icon: 'warning',
  //     stack: false
  //   })
  //   return abort()
  // }
  next()
}

export default authInterceptor
