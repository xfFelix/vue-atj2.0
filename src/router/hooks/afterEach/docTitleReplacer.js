/**
 * 替换浏览器标签页标题
 * 目前没做 写死的标题 功能扩展
 */
const docTitleReplacer = (to) => {
  const { title } = to.meta
  console.info('标题为：' + title)
  // let titles = []
  // matched.slice().forEach(({ handler: { title } }) => {
  //   title && titles.push(title)
  // })
  // document.title = titles.join(' · ')
}

export default docTitleReplacer
