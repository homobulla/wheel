// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import flexible from 'lib-flexible'

import axios from './commenjs/axios'
Vue.prototype.$axios = axios

import api from './commenjs/api'
global.api = api
// 公共方法
import utils from './commenjs/utils'
Vue.use(utils)
Vue.config.productionTip = false

// toast 组件
// import 'vue2-toast/lib/toast.css'
// import Toast from 'vue2-toast'
// Vue.use(Toast)

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
    (localStorage.getItem('token') || to.path === '/login' || to.path === '/register' || to.path === '/reg2') ? next(): next('/login')
})
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})
