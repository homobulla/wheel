// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import flexible from 'lib-flexible'

import axios from './commenjs/axios'
Vue.prototype.$axios = axios
import myaxios from 'axios'
Vue.prototype.$myaxios = myaxios
let b = Vue.prototype.$myaxios;
b.defaults.withCredentials = true
import api from './commenjs/api'
global.api = api
// 公共方法
import utils from './commenjs/utils'
Vue.use(utils)
Vue.config.productionTip = false

import toast from './components/toast/index'
Vue.use(toast)
// 滑动组件
import slide from './components/slide.vue'
Vue.component('homo-slide', slide)
// 修改微信头部
Vue.use(require('vue-wechat-title'))
// 底部
import foot from './components/foot.vue'
Vue.component('homo-foot', foot)
// 弹窗
import pop from './components/pop.vue'
Vue.component('homo-pop', pop)
//二维码生成
//import qrcode from '../static/js/qrcode.js'

router.beforeEach((to, from, next) => {
  localStorage.getItem('token') || to.path === '/login' || to.path === '/' || to.path === '/reg2' || to.path === '/active' 
    ? next()
    : window.location.href = api.LOGIN
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
