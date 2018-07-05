import Vue from 'vue'
import Router from 'vue-router'


import pages from '@/pages';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '蜂眸微服务'
      },
      component: pages.logreg.login
    },
    {
      path: '/',
      name: 'register',
      meta: {
        title: '蜂眸微服务'
      },
      component: pages.logreg.register
    },
    {
      path: '/reg2',
      name: 'reg2',
      meta: {
        title: '蜂眸微服务'
      },
      component: pages.logreg.reg2
    },
    {
      path: '/openAccount',
      name: 'openAccount',
      meta: {
        title: '开通银行存管账户'
      },
      component: pages.account.openAccount
    },
    {
      path: '/myInvite',
      name: 'myInvite',
      meta: {
        title: '我的邀请'
      },
      component: pages.account.myInvite
    },
    

    {
      path: '/loanGuide',
      name: 'loanGuide',
      meta: {
        title: '借款指引'
      },
      component: pages.loanGuide
    },
    {
      path: '/share',
      name: 'share',
      meta: {
        title: '我的二维码'
      },
      component: pages.account.share
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        title: '我的账户'
      },
      component: pages.account.account
    },
    {
      path: '/getMoneyRecord',
      name: 'getMoneyRecord',
      meta: {
        title: '累计赚取记录'
      },
      component: pages.getMoneyRecord
    },
    {
      path: '/cumulative',
      name: 'cumulative',
      meta: {
        title: '累计邀请记录'
      },
      component: pages.account.cumulative
    },

    {
      path: '/regSuc',
      name: 'regSuc',
      meta: {
        title: '累计邀请记录'
      },
      component: pages.money.regSuc
    },
    {
      path: '/active',
      name: 'active',
      meta: {
        title: '立即赚钱'
      },
      component: pages.money.active
    },
    {
      path: '/activeReg',
      name: 'activeReg',
      meta: {
        title: '蜂眸微服务'
      },
      component: pages.money.activeReg
    },
    
    
  ]
})
