var ENV = {
  baseURL: '/jeeplus',
  serverRootUrl: '/jeeplus',
  moduleName: 'jeeplus',
  version: '1.0',
  environment: process.env.NODE_ENV,
  defaultLocale: 'zh',
  apiNameSpace: 'api',
  hostEndpoint: 'jeeplus',
  fileUploadUrl: '',
  photoPreviewUrl: 'http://localhost:8080',
  routeRootPath: null
}

if (ENV.environment === 'development') {
  ENV.baseURL = `http://localhost:8080/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
}
if (ENV.environment === 'production') {
  // ENV.photoPreviewUrl = `http://www.szhhxh.com/`
  // ENV.baseURL = `http://www.szhhxh.com/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
  ENV.photoPreviewUrl = `http://www.icheckup.cn/`
  ENV.baseURL = `http://www.icheckup.cn/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
  // ENV.baseURL = `http://192.168.23.1:8080/${ENV.hostEndpoint}/${ENV.apiNameSpace}`
  // ENV.photoPreviewUrl = `http://192.168.23.1:8080/`
}

export default ENV
