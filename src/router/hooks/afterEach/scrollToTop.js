// import trimQs from 'UTIL/trimQs'
/**
 * 不同页面间的跳转，把视图拉回顶部
 */
const scrollToTop = ({ to, from }) => {
  // console.log(to)
  // console.log(from)
  // console.log(to.path == from.path)
  // if (trimQs(to.path) !== trimQs(from.path)) {
    // $.scrollTo('#navbar', 500)
  document.body.scrollTop = 0
  // 为了兼容所以使用两种
  document.documentElement.scrollTop = 0
  // }
}

export default scrollToTop
