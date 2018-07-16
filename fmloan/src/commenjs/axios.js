import Eajax from 'axios'
import qs from 'qs'

const Axios = function(defaultConfig) {
  return this.packageAxios(defaultConfig)
}
Axios.prototype = {
  packageAxios: function(options = {}) {
    this.getBaseParams(options)
    return Eajax({
      url: this.url,
      method: this.method,
      data: this.data,
      withCredentials: true,
      timeout: 10000
    })
      .then(res => {
        // 蜂投理财接口未登录跳转登录页
        if (res.data.errCode == -1 && this.urlType === 1) {
          localStorage.removeItem('token')
        }
        return res
      })
      .catch(error => {})
  },
  getBaseParams: function(options) {
    options = options || {}
    this.method = options.method || 'post' // 方法
    this.url = options.url || api.BASE_URL // 地址
    this.urlParams = options.urlParams || '' // 地址参数
    this.urlType = options.urlType || 0 // 判断url的类型来请求不同的接口
    this.callback = options.callback || undefined // 回调
    this.cutRequestData(options)
    // this.judgeEncrypt(options)
  },
  // 切换请求头格式
  cutRequestData(options) {
    switch (this.urlType) {
      
      case 0:
        this.data = qs.stringify({
          requestMsg: JSON.stringify({
            header: {
              transcode: options.data.transcode
            },
            body: options.data.body
          })
        })
        break
      case 1:
        this.data = options.data
        this.url = api.LICAI + this.url
        break
      case 2:
        this.data = options.data
        this.url =  this.url
        break
    }
  },
  // 判断是否加密
  judgeEncrypt(options) {
    if (this.urlType === 1) {
      this.data = this.signRequestData(this.data, options.data.transcode, options.urlType)
    }
  },
  // 蜂投借款 && 蜂投理财数据加密
  signRequestData: function(data, transcode, urlType) {
    let md5key
    if (this.urlType === 0) {
      md5key = encryptByMd5(JSON.stringify(data) + transcode).toUpperCase()
    } else if (this.urlType === 1) {
      md5key = encryptByMd5(JSON.stringify(data)).toUpperCase()
    }
    let data2 = encryptByDES(JSON.stringify(data), 'A1B2C3D4E5F6G7H8I9J0K1L2')
    return {
      data: md5key + data2
    }
  }
}

const createInstance = defaultConfig => {
  return new Axios(defaultConfig)
}

export default createInstance
