
const DOMAIN = 'tysrlogin.ftoul.com' 
const BASE = `tyfyd.ftoul.com`
const BACKURL = `http://192.168.52.205:8080/%23/active`  // 回调地址

// const DOMAIN = `192.168.52.106:8444` 
// const BASE = `192.168.52.106:8445`


export default {
  agree: ``,
  android: `http://sj.qq.com/myapp/detail.htm?apkName=com.ftoul.myapplication`, // 借款安卓应用宝地址
  ios: `https://itunes.apple.com/cn/app/%E8%9C%82%E6%8A%95%E5%80%9F%E6%AC%BE/id1194914565?mt=8`, // 借款IOS应用宝地址
  BASE_URL: `https://${BASE}/fyd/service/h5Interface`,
  LOCATION: `https://pv.sohu.com/cityjson?ie=utf-8`,
  LICAI: `https://${DOMAIN}/p2p-front/services/api/v2/`,
  OPEN: `https://${DOMAIN}/p2p-front/services/JushiPay`,
  LOGIN: `https://${BASE}/fyd/login/index?callback=${BACKURL}`,
  LOGINOUT: `https://${DOMAIN}/p2p-front/services/logout?callback=${BACKURL}`
}
