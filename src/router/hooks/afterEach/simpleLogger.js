/**
 * 打印路由日志到控制台
 */
const simpleLogger = (to, from) => {
  console.info(`[路由日志] ${from.path || ''} => ${to.path}`)
}

export default simpleLogger
